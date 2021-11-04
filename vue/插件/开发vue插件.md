#### 编写插件

> 每当这个插件被添加到应用程序中时，如果它是一个对象，就会调用 `install` 方法。如果它是一个 `function`，则函数本身将被调用。在这两种情况下——它都会收到两个参数：由 Vue 的 `createApp` 生成的 `app` 对象和用户传入的选项。

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Plugin code goes here
  }
}
```

>我们想要一个函数来翻译整个应用程序可用的键，因此我们将使用 `app.config.globalProperties` 暴露它。

> 该函数将接收一个 `key` 字符串，我们将使用它在用户提供的选项中查找转换后的字符串

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}

//example：
let options={
  greetings : {
    hello: "Bonjour!",
    name: {
      firstName:"zhang",
      secondName:"san"
    },
  }
};
function translate(key: any): any {
  return key.split(".").reduce((o: any, i: any) => {
    if (o) return o[i];
  }, options);
}
console.log(translate("greetings.name.firstName"));// zhang
```

> 插件还允许我们使用 `inject` 为插件的用户提供功能或 attribute。例如，我们可以允许应用程序访问 `options` 参数以能够使用翻译对象。

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  }
}
//插件用户现在可以将 inject[i18n] 注入到他们的组件并访问该对象。
```

> 由于我们可以访问 `app` 对象，因此插件可以使用所有其他功能，例如使用 `mixin` 和 `directive`

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.')
        .reduce((o, i) => { if (o) return o[i] }, options)
    }

    app.provide('i18n', options)

    app.directive('my-directive', {
      mounted (el, binding, vnode, oldVnode) {
        // some logic ...
      }
      ...
    })

    app.mixin({
      created() {
        // some logic ...
      }
      ...
    })
  }
}
```

#### 使用插件

```js
import { createApp } from 'vue'
import Root from './App.vue'
import i18nPlugin from './plugins/i18n'

const app = createApp(Root)
const i18nStrings = {
  greetings: {
    hi: 'Hallo!'
  }
}

app.use(i18nPlugin, i18nStrings)
app.mount('#app')
```

