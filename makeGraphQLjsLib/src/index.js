//import gql from 'graphql-tag';

//import { OfflineClient } from '@aerogear/voyager-client';

//console.log(OfflineClient)

//window.OfflineClient = OfflineClient
//window.gql = gql
alert("oo8")
import "@babel/polyfill";
import { createHttpLink } from "apollo-link-http";
var double = input => {
                        return input * 2
                }
alert(double(2))
import { InMemoryCache } from "apollo-cache-inmemory";
alert(3)


import {ApolloClient} from 'apollo-boost';
alert(4)
import gql from "graphql-tag";
alert(5)

// the Apollo cache is set up automatically

const client = new ApolloClient({
    link: createHttpLink({ uri: "/graphql" }),
    cache: new InMemoryCache()
}
);

alert(6)



client.query(
                {
                    query: gql `query {
                                    getTest( id: 341 ) {
                                        id
                                        name
                                        questions {
                                          id
                                          question
                                        }
                                    }
                                }`
                }
            )
.then(
        result => {
            alert(7)
            console.log(result)
            alert(JSON.stringify(result,null,2))
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
