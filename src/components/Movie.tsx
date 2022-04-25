import { Flex, ListItem, ListIcon, Text, Image, Box } from '@chakra-ui/react';
import { BiMoviePlay } from 'react-icons/bi';

export type MovieType = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

export default function Movie({ movie }: { movie: MovieType }) {
  return (
    <ListItem key={movie.imdbID} p={2}>
      <Flex bg="grey.10">
        <Box px={6}>
          <Image
            src={movie.Poster}
            fallbackSrc="https://via.placeholder.com/80"
            minWidth={'80px'}
            boxSize="80px"
            objectFit="cover"
          />
        </Box>
        <Box>
          <Flex justify={'start'} align={'center'}>
            <ListIcon as={BiMoviePlay} color="green.500" />
            <Text fontSize="xl">{movie.Title}</Text>
          </Flex>
          <Box>
            <Text as="em" fontSize="xs">
              ({movie.Year})
            </Text>
          </Box>
        </Box>
      </Flex>
    </ListItem>
  );
}
