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
    data: {
        questions:       []
    }
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




request(
            "/graphql"
            ,
            `query {
                getTopCourses {
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
            store.commit("setTopCourses", result.getTopCourses)
        }
    );





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
