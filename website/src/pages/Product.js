import ReviewRating from '../components/ReviewRating';

import Spinner from '../components/Spinner';
// import SubmitReview from '../components/SubmitReview';
import {Error} from './Error';
import {
  Flex,
  HStack,
  Heading,
  Image,
  Skeleton,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

export const GET_PRODUCT_DETAILS = gql`
  fragment ProductFragment on Product {
    averageRating
    reviews {
      content
      rating
    }
  }

  query GetProductDetails($productId: ID!) {
    product(id: $productId) {
      id
      title
      description
      mediaUrl
      ...ProductFragment @defer
    }
  }
`;

export default function Product() {
  const {id} = useParams();

  const response = useQuery(GET_PRODUCT_DETAILS, {
    variables: {productId: id}
  });
  const {loading, error, data = {}} = response;
  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;
  const {title, description, mediaUrl, reviews, averageRating} =
    data?.product || {};

  return (
    <>
      {data && (
        <Stack direction="column" px="12" spacing="6" mb="12">
          <Heading as="h1" size="lg">
            {title}
          </Heading>
          <Skeleton isLoaded={reviews !== undefined} w="192px">
            <HStack>
              {averageRating && (
                <ReviewRating isHalf size={16} rating={averageRating || 0} />
              )}
              <div>({reviews?.length || '-'})</div>
            </HStack>
          </Skeleton>
          <Stack direction="column" spacing="6">
            <Image
              src={mediaUrl}
              alt={title}
              objectFit="cover"
              width="100%"
              height="500px"
              borderRadius="12"
            />
            <Flex direction="column" justify="space-between">
              <Heading as="h2" py="4" size="md" mb="2">
                About this product
              </Heading>
              <Text fontWeight="regular" mr="1">
                {description}
              </Text>
            </Flex>
          </Stack>
          <Flex direction="row">
            <Stack flex="1" direction="column" spacing="12">
              <Stack
                direction="column"
                spacing="4"
                divider={<StackDivider borderColor="gray.200" />}
              >
                <Heading as="h2" size="md" mb="2" marginTop={8}>
                  What other users have to say
                </Heading>
                <Skeleton isLoaded={reviews !== undefined} h="100px">
                  {reviews?.length === 0 ? (
                    <Text>No reviews yet</Text>
                  ) : (
                    reviews?.map(({content, rating}, i) => (
                      <Stack
                        direction="column"
                        spacing="1"
                        key={`${i}-${rating}`}
                        py="8"
                      >
                        <ReviewRating size={16} rating={rating} />
                        <Text py="2">{content}</Text>
                      </Stack>
                    ))
                  )}
                </Skeleton>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
    </>
  );
}
