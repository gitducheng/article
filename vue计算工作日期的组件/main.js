// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex)
Vue.use(ElementUI);
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: { count: 0 },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            setTimeout(function() {
                console.log("一个异步函数而已")
            }, 1000)
            context.commit('increment')
        }
    },
    getters: {
        countAdd: function(state) {
            return state.count
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})