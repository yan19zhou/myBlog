#### 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
#### 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
案例：

    1. 在src/main.js中使用vuex
      ....
      省略vue等其他导入
      ....
      // 导入vuex
      import store from './store/modules'
      // 实例化vue，将vuex传入vue中
      new Vue({
        ...
        store,
        ...
      });

2.在src/store/modules.js中配置vuex

    // 导入vue
    import Vue from 'vue';
    // 导入vuex
    import Vuex from 'vuex';
    // 使用vuex
    Vue.use(Vuex);

    //导入各个业务模块
    import card from './card'
    import photo from './card'
    //构造store
    const store = new Vuex.Store({
      // 模块化
      modules: {
          card: card,
          photo: photo
          // 如果还有其他模块依此写入
      }
    });
    // 导出store
    export default store;

3. src/store/card/index.js (卡功能)

          /**
        * 定义命名空间，防止多个模块同名共享，使用时需要带上命名空间
        */
        const card = {
           namespaced: true,
        state: {
          cardArr: [],

          },
          mutations: {
            addCard(state, obj){
              state.cardArr.push(obj);
                  }
                },
            actions: {
              addCardFun(store, obj){
                  store.commit('addCard', obj);
                  }
                }
              }

        //导出
        export default card;

4.src/store/photo/index.js (照片功能)

    const state = {
      photoArr: []
    }  
    const mutations = {
      addPhoto(state, obj){
        state.photoArr.push(obj);
      }
    }

    const actions = {
      addPhotoFun({commit}, obj){
          commit('addPhoto', obj)
      }
    }

    const photo = {
      /**
      * 定义命名空间，防止多个模块同名共享
      */
      namespaced: true,

      state: state,
      mutations: mutations,
      actions: actions
    }
    export default photo;

5.src/page/store/modules.vue

    <template>
      <div>
          组件显示：
          <sotre-vue></sotre-vue>
          <br><br>
          本页面vuex 模块化：<br><br>
          显示卡列表：<button @click="aCard">追加卡信息</button>
          <ul>
            <li v-for="(result, index) in cardArr" :key="index">
              卡号：{{result.no}} <br>
              昵称：{{result.name}}
            </li>
          </ul>

          <br><br>
          显示图片：<button @click="aPhoto">添加图片</button>
          <ul>
            <li v-for="(result, index) in photoArr" :key="index">
              ID：{{result.no}} <br>
              昵称：{{result.name}}
            </li>
          </ul>
      </div>
    </template>
    <script>
      // 导入state、mapMutations、actions   
      import { mapState, mapMutations, actions   } from 'vuex';
      // 导入mutations
      //import { mapMutations } from 'vuex'
      // 导入actions
      //import { actions } from 'vuex'

      // 导入子组件
      import storeVue from './storeVue'

      export default {
        data(){
          return {
          }
        },
        computed:{
            // 映射带有命名空间的state，第一个参数模块名
            ...mapState('card', [
                cardArr: state => state.cardArr
            ]),
            ...mapState('photo', [
                photoArr: state => state.photoArr
            ])
        },
        methods: {
            // 映射带有命名空间的mutations，第一个参数模块名
            `````````````                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
              ...mapMutations('photo', [
                'addPhoto'
              ]),
              // 映射带有命名空间的actions，第一个参数模块名
              ...mapActions('card', [
                'addCardFun'
              ]),
              ...mapActions('photo', [
                'addPhotoFun'
              ]),
              aCard(){
                var rand = (Math.random(10) * 100).toFixed();
                var data = {name: 'zs'+rand, no: '62244000'+rand}
                // mapMutations 提交时需要带上命名空间()
                //this.$store.commit('card/addCard', data);
                //this.addCard(data);

                // 通过actions调用
                //this.$store.dispatch('card/addCardFun', data)
                this.addCardFun(data);

              },
              // 添加图片
              aPhoto(){
                var rand = (Math.random(10) * 100).toFixed();
                var data = {name: 'photo'+rand, no: '62244000'+rand}
                // 提交muations
                //this.$store.commit('photo/addPhoto', data);
                //this.addPhoto(data);

                // 调用actions
                //this.$store.dispatch('photo/addPhotoFun', data);
                this.addPhotoFun(data);
              }
        },
        // 导入组件
        components: {
          //
          storeVue
        }
      }
    </script>

6.子组件src/page/vuex/storeVue.vue

    <template>
      <div> 
          storeVue 组件：<br><br>
          显示card： {{$store.state.card.cardArr}}<br><br>
          显示photo：{{$store.state.photo.photoArr}}
          <hr/>
      </div>
    </template>
    
    <script>
      export default {
          data(){
            return {
            }
          }
      }
    </script>
