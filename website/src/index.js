import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import theme from './theme.js';
import {ChakraProvider} from '@chakra-ui/react';

const client = new ApolloClient({
  // uri: 'https://main--hack-the-e-commerce.apollographos.net/graphql',
  uri: 'https://apollo-router-railway-production.up.railway.app/',
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
