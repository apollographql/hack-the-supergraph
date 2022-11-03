import ProductCard from '../components/ProductCard';
import {Error} from './Error';

import Spinner from '../components/Spinner';
import {Heading, SimpleGrid, Stack, Text, VStack} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

export const GET_LATEST_PRODUCTS = gql`
  query HomepageProducts {
    products {
      id
      title
      description
      mediaUrl
    }
  }
`;
export default function HomePage() {
  const {error, loading, data} = useQuery(GET_LATEST_PRODUCTS);
  if (error) return <Error error={error.message} />;
  return (
    <Stack direction="column" spacing="12">
      <VStack direction="column" spacing="2" py="10">
        <Heading size="2xl">Find yourself in a galaxy far, far away</Heading>
        <Text fontSize="2xl">
          Let&apos;s find the right place for you! Check out what other
          cosmonauts are saying.
        </Text>
      </VStack>
      <Stack direction="column" spacing="4">
        <Heading as="h2" size="lg">
          Products
        </Heading>
        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            {data?.products.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Stack>
  );
}
