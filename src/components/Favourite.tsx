import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { Heading, Text, Image, Link } from '@chakra-ui/react';
import { MovieType } from './Movie';

interface FavouriteData {
  favourite: MovieType;
}

interface FavouriteVars {
  id: string;
}

export default function Favourite({ id }: { id: string }) {
  const favouritesQuery = gql`
    query Favourite($id: String!) {
      favourite(id: $id)
        @rest(type: "Favourite", path: "&i={args.id}", endpoint: "fav") {
        Title
        Year
        Poster
        imdbID
      }
    }
  `;

  const { data, loading, error } = useQuery<FavouriteData, FavouriteVars>(
    favouritesQuery,
    {
      variables: {
        id: id,
      },
    }
  );

  if (error) return <h1>Error happened while fetching favourites' movies</h1>;

  return (
    <>
      {!data || (!data.favourite && loading && <h1>Loading...</h1>)}
      {data && data.favourite && (
        <>
          <Heading
            as={Text}
            w={{
              base: '100%',
              md: '230px',
              lg: '100%',
              xl: '100%',
            }}
            isTruncated
            size="md"
            pb={2}
            align={'center'}
          >
            {data.favourite.Title}
          </Heading>
          <Link
            href={`https://www.imdb.com/title/${data.favourite.imdbID}`}
            isExternal
          >
            <Image src={data.favourite.Poster} width={100} />
          </Link>
        </>
      )}
    </>
  );
}
