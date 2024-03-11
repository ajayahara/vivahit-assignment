import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Box,
  Button,
  Flex,
  Hide,
  Skeleton,
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
import { useSearchParams } from "react-router-dom";

const tableHeaders = [
  "Sl No.",
  "Coin",
  "Current Price",
  "% Change In 24h",
  "Market Cap",
  "Market Rank",
];

export const CoinTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    searchParams.get("page") > 0 ? searchParams.get("page") : 1
  );
  const { data } = useSWR(coinsUrl(page), coinsFetcher, {
    refreshInterval: 30000,
  });
  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);
  return (
    <Box px={{ base: "0", md: "10" }} py="1" w="100%">
      <TableContainer>
        <Table
          variant="simple"
          color="whitesmoke"
          cellPadding="1px"
          cellSpacing="1px"
          width="100%"
        >
          <TableCaption>
            <Flex justifyContent="center" gap="3">
              <Button
                size="sm"
                isDisabled={page == 1}
                onClick={() => setPage(page - 1)}
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
                if (i > 3) {
                  return (
                    <Hide key={i} below="md">
                      <Th textAlign="center" px="0" py="2">{item}</Th>
                    </Hide>
                  );
                }
                return (
                  <Th textAlign="center"  px="0" py="2" key={i}>
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {!data
              ? new Array(10).fill(0).map((_, index) => {
                  return (
                    <Tr key={index}>
                      {tableHeaders.map((_, i) => (
                        <Th key={i}>
                          <Skeleton height="25px" />
                        </Th>
                      ))}
                    </Tr>
                  );
                })
              : data?.map((coin, i) => (
                  <CoinsRow key={i} page={page} coin={coin} i={i} />
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
