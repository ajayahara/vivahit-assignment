import { Center, Flex, Hide, Image, Td, Text, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
const CoinsRow = memo(({ page, coin, i }) => {
  const navigate = useNavigate();
  return (
    <Tr cursor="pointer" onClick={() => navigate(`/crypto/${coin.id}`)}>
      <Td p="0" py="2px" textAlign="center">
        {(page - 1) * 10 + i + 1}
      </Td>
      <Td p="0" py="2px" textAlign="center">
        <Center w="100%">
          <Flex direction="column" justifyContent="start" alignItems="center">
            <Image boxSize="30px" src={coin.image} alt={coin.id}></Image>
            <Text>{coin.symbol}</Text>
          </Flex>
        </Center>
      </Td>
      <Td p="0" py="2px" textAlign="center">
        {coin.current_price?.toFixed(2)}
      </Td>
      <Td p="0" py="2px" textAlign="center">
        <Text
          color={`${coin.price_change_percentage_24h > 0 ? "green" : "red"}`}
        >
          {coin.price_change_percentage_24h.toFixed(3)} %
        </Text>
      </Td>
      <Hide below="md">
        <Td p="0" py="2px" textAlign="center">
          {coin.market_cap}
        </Td>
      </Hide>
      <Hide below="md">
        <Td p="0" py="2px" textAlign="center">
          {coin.market_cap_rank}
        </Td>
      </Hide>
    </Tr>
  );
});
CoinsRow.displayName = "CoinsRow";
export { CoinsRow };
