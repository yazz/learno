import  "@babel/polyfill";
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






    request(
                "/graphql"
                ,
                `query {
                    getTests {
                        id
                        name
                        description
                    }
                }
                `
        )
    .then(
            result => {
                //console.log(result)
                //alert(JSON.stringify(result,null,2))
                store.commit("setTests", result.getTests)
            }
        );
