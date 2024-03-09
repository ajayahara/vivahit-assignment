import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
export const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const { id } = useParams();
  const getCoinDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    getCoinDetails();
  }, [id, getCoinDetails]);
  return (
    <Box maxHeight="90vh" overflowY="scroll" bg="gray.900" w={{base:"100%",lg:"30%"}} padding="5">
      <Center gap="2" flexDir="column">
        <Image
          boxSize="200px"
          borderRadius="50%"
          src={coin.image?.large}
          alt={id}
        ></Image>
        <Heading as="h3" fontSize="2xl" fontWeight="bold">
          {coin.name}
        </Heading>
        <Text as="p" w="100%" textAlign="justify">
          {coin.description?.en.split(".")[0]}.
        </Text>
      </Center>
      <Grid mt="3">
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="2xl" fontWeight="bold">
              Rank :
            </Text>
            <Text fontSize="2xl" fontWeight="thin">
              {coin.market_cap_rank}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="2xl" fontWeight="bold">
              Current Price :
            </Text>
            <Text fontSize="2xl" fontWeight="thin">
              {coin.market_data?.current_price.inr}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="2xl" fontWeight="bold">
              %Change In 24h :
            </Text>
            <Text
              color={`${
                coin.market_data?.price_change_percentage_24h > 0
                  ? "green"
                  : "red"
              }`}
              fontSize="2xl"
              fontWeight="thin"
            >
              {coin.market_data?.price_change_percentage_24h} %
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="2xl" fontWeight="bold">
              Symbol :
            </Text>
            <Text fontSize="2xl" fontWeight="thin">
              {coin.symbol}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="2xl" fontWeight="bold">
              Market Cap :
            </Text>
            <Text fontSize="2xl" fontWeight="thin">
              {coin.market_data?.market_cap.inr}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
