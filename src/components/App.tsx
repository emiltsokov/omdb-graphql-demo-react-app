import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { RestLink } from 'apollo-link-rest';
import Page from './Page';

const restLink = new RestLink({
  endpoints: {
    search: {
      uri: 'http://www.omdbapi.com/?apikey=b9c534fa',
      responseTransformer: async (response) =>
        response
          .json()
          .then(
            ({ Search }: { Search: string[]; totalResults: string }) => Search
          ),
    },
    fav: {
      uri: 'http://www.omdbapi.com/?apikey=b9c534fa',
    },
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const App = () => (
  <ApolloProvider client={client}>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route path="*" element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </ApolloProvider>
);

export default App;
