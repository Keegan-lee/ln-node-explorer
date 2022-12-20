import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.amboss.space/graphql',
  cache: new InMemoryCache(),
});