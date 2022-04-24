import { Grid, GridItem, Flex, Heading } from '@chakra-ui/react';
import Favourite from './Favourite';

const myMovieIDs = [
  'tt0133093',
  'tt1375666',
  'tt0113277',
  'tt0109830',
  'tt0205306',
  'tt0110413',
  'tt0120815',
  'tt0095016',
  'tt0120735',
];

export default function Favourites() {
  return (
    <Flex direction={'column'} align={'center'} p={6} bg="#ccc">
      <Heading as="h2" size="xl" alignContent={'center'}>
        My top {myMovieIDs.length} films
      </Heading>
      <Flex>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {myMovieIDs.map((id: string) => (
            <GridItem w="100%" key={id}>
              <Flex direction={'column'} align={'center'} justify={'center'}>
                <Favourite id={id} />
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
