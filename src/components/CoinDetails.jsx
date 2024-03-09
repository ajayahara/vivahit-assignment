import { useParams } from "react-router-dom";
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
import useSWR from "swr";
import { coinFetcher, singleCoinUrl } from "../data";

export const CoinDetails = () => {
  const { id } = useParams();
  const {data}=useSWR(singleCoinUrl(id),coinFetcher,{refreshInterval:60000});
  return (
    <Box maxHeight="100vh" overflowY="scroll" bg="gray.900" w={{base:"100%",lg:"30%"}} padding="5">
      <Center gap="2" flexDir="column">
        <Image
          boxSize="200px"
          borderRadius="50%"
          src={data?.image?.large}
          alt={id}
        ></Image>
        <Heading as="h3" fontSize="2xl" fontWeight="bold">
          {data?.name}
        </Heading>
        <Text as="p" w="100%" textAlign="justify">
          {data?.description?.en.split(".")[0]}.
        </Text>
      </Center>
      <Grid mt="3">
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Rank :
            </Text>
            <Text fontSize="xl" fontWeight="thin">
              {data?.market_cap_rank}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Current Price :
            </Text>
            <Text fontSize="xl" fontWeight="thin">
              {data?.market_data?.current_price.inr}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="xl" fontWeight="bold">
              %Change In 24h :
            </Text>
            <Text
              color={`${
                data?.market_data?.price_change_percentage_24h > 0
                  ? "green"
                  : "red"
              }`}
              fontSize="xl"
              fontWeight="thin"
            >
              {data?.market_data?.price_change_percentage_24h} %
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Symbol :
            </Text>
            <Text fontSize="xl" fontWeight="thin">
              {data?.symbol}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="center" gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Market Cap :
            </Text>
            <Text fontSize="xl" fontWeight="thin">
              {data?.market_data?.market_cap.inr}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
