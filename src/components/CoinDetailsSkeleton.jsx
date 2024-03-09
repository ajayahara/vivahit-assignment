import { Center, Skeleton } from "@chakra-ui/react";

export const CoinDetailsSkeleton = () => {
  return (
    <Center gap="2" flexDir="column">
      <Skeleton height="200px" width="200px" borderRadius="50%" />
      <Skeleton height="32px" width="100%" my="2" />
      <Skeleton height="20px" width="100%" my="2" />
      <Skeleton height="150px" width="100%" my="2" />
    </Center>
  );
};
