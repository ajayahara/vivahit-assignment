import axios from "axios";
// Urls:
const baseUrl = `https://api.coingecko.com/api/v3`;
const coinsUrl = (page) =>
  `${baseUrl}/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`;
const singleCoinUrl = (id) => `${baseUrl}/coins/${id}`;
const priceHistoryUrl = (id, days) =>
  `${baseUrl}/coins/${id}/market_chart?vs_currency=INR&days=${days}`;
// Fetchers:
const coinsFetcher = (...args) => axios.get(...args).then((res) => res.data);
const coinFetcher = (...args) => axios.get(...args).then((res) => res.data);
const historyFetcher = (...args) =>
  axios.get(...args).then((res) => res.data.prices);
// Buttons:
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
export {
  coinsUrl,
  singleCoinUrl,
  priceHistoryUrl,
  coinsFetcher,
  coinFetcher,
  historyFetcher,
  buttons
};
