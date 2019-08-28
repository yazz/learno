import  "@babel/polyfill";
import { request }          from "graphql-request";
import   Vue                from "vue";
import   App                from "./main-vue-app.vue";

import Vuex from 'vuex'

Vue.use(Vuex)

var bus = new Vue();
    // Define a new component called button-counter
    Vue.component('button-counter', {
      data: function () {
        return {
          count: 0
        }
      },
      template:
`<div class="card" style="margin-bottom: 40px;">
  <header class="card-header">
      <p   class="card-header-title"
           v-on:click=' this.bus.$emit("setAppMode", "questions");this.bus.$emit("getQuestions", table.id)'>

          {{table.name}} - Rating: {{table.rating}}
      </p>

      <a href="#" class="card-header-icon" aria-   label="more options">
          <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
      </a>
  </header>


  <div class="card-content">
      <div class="content">
          {{table.description}}
      </div>
  </div>

  <footer class="card-footer">
      <a href="#" class="card-footer-item">Start</a>
      <a href="#" class="card-footer-item">Similar</a>
      <a href="#" class="card-footer-item">Continue</a>
  </footer>
</div>`,
props:["table"]
    })



var app = new Vue({
    el: '#app',
    data: {
        message:        'Learno',
        courses:         [],
        top_courses:     [],
        questions:       [],
        mode:           "top_courses",
        bus:             bus
    }
    ,
    mounted: function() {
    }
    ,
    methods: {
        getQuestions: async function(courseId) {
        }
    },
    components: { App }
})

request(
            "/graphql"
            ,
            `query {
                getTest( id: 341 ) {
                    id
                }
            }
            `
    )
.then(
        result => {
            //console.log(result)
            //alert(JSON.stringify(result,null,2))
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


    var userAction4 = async () => {
      const response = await fetch('/get_top_courses');
      const myJson = await response.json();
      app.top_courses = myJson
      //console.log(app.top_courses)
    }
    userAction4()
