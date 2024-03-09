import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CoinsRow } from "./CoinsRow";

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
  const [page, setPage] = useState(1);

  const getAllCoins = useCallback(async () => {
    if (page < 1) return;
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      setCoins(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    getAllCoins();
  }, [page, getAllCoins]);

  return (
    <Box px={{ base: "0", md: "10" }} py="1" w="100%">
      <TableContainer>
        <Table
          variant="simple"
          color="whitesmoke"
          cellPadding="1px"
          cellSpacing="1px"
        >
          <TableCaption>
            <Flex justifyContent="center" gap="3">
              <Button
                size="sm"
                isDisabled={page == 1}
                onClick={() => setPage(page -1)}
              >
                {"<"}
              </Button>
              <Button size="sm">{page}</Button>
              <Button
                size="sm"
                isDisabled={coins.length < 10}
                onClick={() => setPage(page + 1)}
              >
                {">"}
              </Button>
            </Flex>
          </TableCaption>
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
              return <CoinsRow key={i} page={page} coin={coin} i={i} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
