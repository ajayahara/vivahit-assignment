import { useEffect, useState } from "react";
import axios from "axios";
import {
  Center,
  Flex,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
  "Sl No.",
  "Coin",
  "Current Price",
  "% Change In 24h",
  "Market Cap",
  "Market Rank",
];

export const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const navigate=useNavigate();
  const getAllCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      setCoins(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCoins();
  }, []);
  return (
    <>
      <TableContainer >
        <Table variant="striped" cellPadding="1px" cellSpacing="1px">
          <TableCaption>Showing trending crypto currencies.</TableCaption>
          <Thead>
            <Tr>
              {tableHeaders.map((item, i) => {
                return (
                  <Th textAlign="center" key={i}>
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {coins.map((coin, i) => {
              return (
                <Tr key={i} cursor="pointer" onClick={()=>navigate(`/crypto/${coin.id}`)}>
                  <Td py="1" textAlign="center">
                    {i + 1}
                  </Td>
                  <Td py="1" textAlign="center">
                    <Center w="100%">
                      <Flex
                        direction="column"
                        justifyContent="start"
                        alignItems="center"
                      >
                        <Image
                          boxSize="30px"
                          src={coin.image}
                          alt={coin.id}
                        ></Image>
                        <Text>{coin.symbol}</Text>
                      </Flex>
                    </Center>
                  </Td>
                  <Td py="1" textAlign="center">
                    {coin.current_price?.toFixed(2)}
                  </Td>
                  <Td py="1" textAlign="center">
                    {coin.price_change_percentage_24h.toFixed(3)} %
                  </Td>
                  <Td py="1" textAlign="center">
                    {coin.market_cap}
                  </Td>
                  <Td py="1" textAlign="center">
                    {coin.market_cap_rank}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
