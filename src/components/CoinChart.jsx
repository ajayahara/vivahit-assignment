import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box, Button } from "@chakra-ui/react";

const buttons = [
  {
    name: "24 Hours",
    value: 1,
  },
  {
    name: "1 Month",
    value: 30,
  },
  {
    name: "3 Months",
    value: 90,
  },
  {
    name: "1 Year",
    value: 365,
  },
];

export const CoinChart = () => {
  const [coinHistory, setCoinHistory] = useState([]);
  const [days, setDays] = useState(1);
  const { id } = useParams();

  const getCoinHistory = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${days}`
      );
      setCoinHistory(response.data?.prices);
    } catch (error) {
      console.log(error);
    }
  }, [id, days]);

  useEffect(() => {
    getCoinHistory();
  }, [id, getCoinHistory, days]);

  return (
    <Box w={{base:"100%",lg:"70%"}} h={{base:"100vh",md:"50vh",lg:"80vh"}} px="5" py={{base:"10"}}>
      <Box display="flex" gap="2" justifyContent={{base:"space-between",md:"end"}} mb="2">
        {buttons.map((item, i) => (
          <Button size="sm" key={i} onClick={() => setDays(item.value)}>
            {item.name}
          </Button>
        ))}
      </Box>
      <Box w="100%" h="100%">
        {coinHistory.length ? (
          <Line
            width="100%"
            height="80%"
            data={{
              labels: coinHistory.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: coinHistory.map((coin) => coin[1]),
                  label: `Price change in ${days} days`,
                  borderColor: "#FFFFFF",
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};
