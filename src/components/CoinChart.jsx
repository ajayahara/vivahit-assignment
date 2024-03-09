import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { buttons, historyFetcher, priceHistoryUrl } from "../data";
import useSWR from "swr";
import { MyLineChart } from "./MyLineChart";

export const CoinChart = () => {
  const [days, setDays] = useState(1);
  const { id } = useParams();
  const {data}=useSWR(priceHistoryUrl(id,days),historyFetcher,{refreshInterval:60000})

  return (
    <Box w={{base:"100%",lg:"70%"}} h={{base:"100vh",md:"50vh",lg:"80vh"}} px="5" py={{base:"10"}}>
      <Box display="flex" gap="2" justifyContent={{base:"space-between",md:"end"}} mb="2">
        {buttons.map((item, i) => (
          <Button size="sm" isDisabled={days==item.value} key={i} onClick={() => setDays(item.value)}>
            {item.name}
          </Button>
        ))}
      </Box>
      <Box w="100%" h="100%">
        {data&&data?.length ? (
          <MyLineChart prices={data} days={days}/>
        ) : "Error while getting histrory of cryptocoin"}
      </Box>
    </Box>
  );
};
