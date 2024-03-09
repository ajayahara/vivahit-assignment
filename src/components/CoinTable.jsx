import { useState } from "react";
import useSWR from "swr"
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
import { coinsFetcher, coinsUrl } from "../data";

const tableHeaders = [
  "Sl No.",
  "Coin",
  "Current Price",
  "% Change In 24h",
  "Market Cap",
  "Market Rank",
];

export const CoinTable = () => {
  const [page, setPage] = useState(1);
  const {data}=useSWR(coinsUrl(page),coinsFetcher,{refreshInterval:60000});
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
                isDisabled={data?.length < 10}
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
            {data?.map((coin, i) => {
              return <CoinsRow key={i} page={page} coin={coin} i={i} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
