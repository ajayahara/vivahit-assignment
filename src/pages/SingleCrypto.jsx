import { Flex } from "@chakra-ui/react";
import { CoinDetails } from "../components/CoinDetails";
import { CoinChart } from "../components/CoinChart";

export const SingleCrypto = () => {
  return (
    <Flex
      w="100%"
      minH="100vh"
      bg="gray.800"
      justifyContent="space-between"
      color="white"
      direction={{
        base:"column",
        lg:"row"
      }}
    >
      <CoinDetails />
      <CoinChart />
    </Flex>
  );
};
