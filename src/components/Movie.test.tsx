import { render } from '@testing-library/react';
import { List } from '@chakra-ui/react';

import Movie from './Movie';
const MovieMock = {
  Title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  Year: '1964',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  imdbID: 'tt0057012',
};

describe('Rendered Movie component', () => {
  test('should show title, year', () => {
    const { getByText, getByAltText } = render(
      <List>
        <Movie movie={MovieMock} />
      </List>
    );

    expect(getByText(MovieMock.Title)).toBeInTheDocument();
    expect(getByText(`(${MovieMock.Year})`)).toBeInTheDocument();
    // const posterImage = getByAltText(MovieMock.Title);
    // expect(posterImage).toBeInTheDocument();
    // expect(posterImage.src).toContain('MovieMock.Poster');
  });
});
