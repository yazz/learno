//import gql from 'graphql-tag';

//import { OfflineClient } from '@aerogear/voyager-client';

//console.log(OfflineClient)

//window.OfflineClient = OfflineClient
//window.gql = gql
import "@babel/polyfill";
import { createHttpLink } from "apollo-link-http";
var double = input => {
                        return input * 2
                }
import { InMemoryCache } from "apollo-cache-inmemory";


import {ApolloClient} from 'apollo-boost';
import gql from "graphql-tag";

// the Apollo cache is set up automatically
const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    }

const client = new ApolloClient({
    link:           createHttpLink({ uri: "/graphql" }),
    cache:          new InMemoryCache({
                            resultCaching: false,
                            freezeResults: true
    }),
    defaultOptions: defaultOptions,
    ssrMode:        true,
    assumeImmutableResults: true
}
);

alert("GraphQL Win NT ")



client.query(
                {
                    query: gql `query {
                                    getTest( id: 341 ) {
                                        id
                                    }
                                }
                                `
                }
            )
.then(
        result => {
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
