import React from 'react';
import { render } from '@testing-library/react';
import { List } from '@chakra-ui/react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

export const ThemeWrapper = ({ children }: any) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

import Movie from './Movie';
const MovieMock = {
  Title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  Year: '1964',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  imdbID: 'tt0057012',
};

describe('Rendered Movie component', () => {
  test('should show title, year and poster', () => {
    // const { getByText } = renderComponent(<Movie movie={MovieMock} />);

    const { getByText } = render(
      <List>
        <Movie movie={MovieMock} />
      </List>,
      {
        wrapper: ThemeWrapper,
      }
    );

    expect(getByText(MovieMock.Title)).toBeInTheDocument();
  });
});
