import gql from 'graphql-tag';

import { OfflineClient } from '@aerogear/voyager-client';

console.log(OfflineClient)

window.OfflineClient = OfflineClient
window.gql = gql
