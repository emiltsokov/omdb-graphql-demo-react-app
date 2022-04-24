import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import {
  Container,
  Input,
  Box,
  List,
  Button,
  Spinner,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

import Movie, { MovieType } from './Movie';

const PAGE_SIZE = 10;

interface MovieData {
  movies: MovieType[];
}

interface MovieVars {
  searchInput: string;
  page: number;
}

const Movies = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const moviesQuery = gql`
    query Movie($searchInput: String!, $page: Int!) {
      movies(searchInput: $searchInput, page: $page)
        @rest(
          type: "Movie"
          path: "&s={args.searchInput}&page={args.page}"
          endpoint: "search"
        ) {
        Title
        Year
        Poster
        imdbID
        results @type(name: "Movie")
      }
    }
  `;

  const { data, loading, error } = useQuery<MovieData, MovieVars>(moviesQuery, {
    variables: {
      searchInput: searchQuery,
      page: page,
    },
  });
  if (error) return <h1>Error happened while fetching movies</h1>;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  return (
    <Container>
      <Box p={6}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={MdSearch} />}
          />
          <Input
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={handleSearch}
          />
        </InputGroup>
      </Box>

      {!data && !loading && searchQuery.length > 3 && (
        <Flex p={4} justify={'center'}>
          No results
        </Flex>
      )}

      {!loading && searchQuery.length > 0 && searchQuery.length < 3 && (
        <Flex p={4} justify={'center'}>
          Type more characters to search
        </Flex>
      )}

      {loading && (
        <Flex p={4} justify={'center'}>
          <Spinner size="lg" />
        </Flex>
      )}
      {!loading && data && data.movies && (
        <Box>
          <List spacing={1}>
            {data &&
              data.movies &&
              data.movies.map((movie: MovieType) => (
                <Movie movie={movie} key={movie.imdbID} />
              ))}
          </List>
          <Flex justify={'center'} align={'center'} p={4}>
            <Button
              colorScheme="teal"
              variant="outline"
              width="160px"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous page
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              width="100px"
              border={0}
              disabled={true}
            >
              {page}
            </Button>
            <Button
              colorScheme="teal"
              width="160px"
              variant="outline"
              disabled={data.movies.length < PAGE_SIZE}
              onClick={() => setPage(page + 1)}
            >
              Next page
            </Button>
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default Movies;
