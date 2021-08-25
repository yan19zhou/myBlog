##### mock

> 插件: mock.js,  mock.vite-plugin-mock

##### css

>moudle 样式模块化

```css
<div :class="$style.logo"></div>
<div :class="classes.logo"></div>
<script setup>
import classes from './App.module.css' //加载模块化css文件
</script>
<style moudle>
.logo{
    color:red
}
</style>
// 使用模块里面的类名
// 优点：每个类名会生成动态哈希
```



##### ts

```typescript
<script setup lang="ts">
	type Course = {
	id:number,
	name:string
	}
	const courses = reactive<Course[]>([{id:1,name:'xiaoming'}])
</script>
```

