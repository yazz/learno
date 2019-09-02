import  "@babel/polyfill";
import { request }          from "graphql-request";
import   Vue                from "vue";
import   MainWindow         from "./main-vue-window.vue";
import   Vuex               from 'vuex';

Vue.use(Vuex);

import { store } from './store.js'

var bus = new Vue();










var app = new Vue({
    el: '#app'
    ,
    data: {
        courses:         [],
        questions:       [],
        bus:             bus
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


//import { ApolloClient, createNetworkInterface } from 'apollo-client//import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
/*
var networkInterface = createNetworkInterface({
  uri: 'http://127.0.0.1:80/graphql',
})

import {
  createClient,
  strategies
} from '@aerogear/datasync-js';



window.OfflineClient = OfflineClient
window.gql = gql

window.createClient = createClient
window.strategies = strategies

const wsClient = new SubscriptionClient('ws://localhost:3020/subscriptions', {
  reconnect: true,
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
)


const GET_DOG = gql`
query {
  getTest(id: 341) {
    id
    name
    questions {
      id
      question
    }
  }
}
`;
console.log(GET_DOG);

const client = new ApolloClient({
  cacheRedirects: {
    Query: {
      dog: (_, { id }, { getCacheKey }) => getCacheKey({ id, __typename: 'Dog' })
    }
  }
})
*/

bus.$on('getQuestions', (id) => {
    app.getQuestions(id)
    window.history.pushState("object or string", "Title", "/course_ids/" + id);
})
bus.$on('setAppMode', (id) => {
    app.mode=id
})


/*
var userAction3 = async () => {
  const response = await fetch('/get_courses');
  const myJson = await response.json();
  app.courses = myJson
}
userAction3()
*/
