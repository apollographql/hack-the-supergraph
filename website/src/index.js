import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat
} from '@apollo/client';

import theme from './theme.js';
import {ChakraProvider} from '@chakra-ui/react';

const httpLink = new HttpLink({
  uri: 'https://main--hack-the-e-commerce.apollographos.net/graphql'
  // uri: 'https://apollo-router-railway-production.up.railway.app/'
});

const delayMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({headers = {}}) => {
    const delay = localStorage.getItem('apollo-x-custom-delay') ?? 1000;
    return {
      headers: {
        ...headers,
        'x-custom-delay': delay
      }
    };
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(delayMiddleware, httpLink),
  cache: new InMemoryCache(),
  name: 'web',
  version: '0.1'
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
