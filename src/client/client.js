import  "@babel/polyfill";
import   $ from "jquery";
import   popper from "popper.js";
import   bootstrap from 'bootstrap';
import  'bootstrap/dist/css/bootstrap.css'
import  '@fortawesome/fontawesome-free/css/all.css'
import { request }          from "graphql-request";
import   Vue                from "vue";
import   MainWindow         from "./main-vue-window.vue";
import   Vuex               from 'vuex';
import { store } from './store.js'

Vue.use(Vuex);



window.store = store

var app = new Vue({
    el: '#app'
    ,
    mounted: function() {
    }
    ,
    methods: {
        getQuestions: async function(courseId) {
        }
    }
    ,
    components: { "main-window": MainWindow }
    ,
    store:        store

})




store.commit("setTopCourses")

store.commit("setTests")
