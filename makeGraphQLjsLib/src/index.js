import gql from 'graphql-tag';

import { OfflineClient } from '@aerogear/voyager-client';

import {
  createClient,
  strategies
} from '@aerogear/datasync-js';

console.log(OfflineClient)

window.OfflineClient = OfflineClient
window.gql = gql

window.createClient = createClient
window.strategies = strategies
