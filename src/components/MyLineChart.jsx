import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {memo} from "react"
export const MyLineChart = memo(({ prices, days }) => {
  return (
    <Line
      width="100%"
      height="80%"
      data={{
        labels: prices.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: prices.map((coin) => coin[1]),
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
  );
})
MyLineChart.displayName="MyLineChart";
