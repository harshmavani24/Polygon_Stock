import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StockOptionsTracker = () => {
  const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
  const [stockPrice, setStockPrice] = useState(0); // Latest stock price
  const [stockData, setStockData] = useState([]); // Stock price data
  const [strikes, setStrikes] = useState([]); // Unique strike prices
  const [putsVolumes, setPutsVolumes] = useState([]); // Puts volume data per strike
  const [callsVolumes, setCallsVolumes] = useState([]); // Calls volume data per strike
  const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data for nearest expiry
  const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
  const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

  // Fetch stock data and options contracts
  useEffect(() => {
    const fetchStockDataAndOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch stock data for the latest price
        const stockResponse = await axios.get(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
        );
        const currentPrice = stockResponse.data.ticker.lastTrade.p;
        setStockPrice(currentPrice);

        // Fetch stock price data for charting
        const stockPriceResponse = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-20/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
        );
        setStockData(stockPriceResponse.data.results || []);

        // Fetch options data dynamically based on stock's current price
        const strikesResponse = await axios.get(
          `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
        );

        const expirationDate = '2024-09-27'; // Example expiration date
        const soonestExpiry = strikesResponse.data.results.reduce((prev, curr) => {
          return new Date(curr.expiration_date) < new Date(prev.expiration_date) ? curr : prev;
        }, strikesResponse.data.results[0]).expiration_date;

        const strikesForExpiry = strikesResponse.data.results.filter(
          contract => contract.expiration_date === soonestExpiry
        );
        const allStrikes = strikesForExpiry.map(contract => contract.strike_price);

        // Find 10 unique strikes closest to the current price (5 above and 5 below)
        const closestStrikes = [...new Set(allStrikes)]
          .sort((a, b) => Math.abs(a - currentPrice) - Math.abs(b - currentPrice))
          .slice(0, 10);

        // Fetch option volumes for these strikes
        const volumePromises = closestStrikes.flatMap(strike =>
          ['call', 'put'].map(async (contractType) => {
            const response = await axios.get(
              `https://api.polygon.io/v3/snapshot/options/${stockSymbol}?strike_price=${strike}&expiration_date=${expirationDate}&contract_type=${contractType}&order=asc&limit=10&sort=strike_price&apiKey=${polygonApiKey}`
            );
            return response.data.results || [];
          })
        );

        const allVolumes = await Promise.all(volumePromises);

        const puts = Array(closestStrikes.length).fill(0);  // Initialize volumes with 0
        const calls = Array(closestStrikes.length).fill(0);

        allVolumes.forEach(resultList => {
          resultList.forEach(contract => {
            const strikeIndex = closestStrikes.indexOf(contract.details.strike_price);
            if (strikeIndex !== -1) {
              if (contract.details.contract_type === 'put') {
                puts[strikeIndex] = contract.day.volume || 0;
              } else if (contract.details.contract_type === 'call') {
                calls[strikeIndex] = contract.day.volume || 0;
              }
            }
          });
        });

        setPutsVolumes(puts);
        setCallsVolumes(calls);
        setStrikes(closestStrikes); // Ensure unique strike prices

        // Fetch cumulative volume data for nearest expiry
        const cumulativeVolumesResponse = await fetchCumulativeVolume(strikesForExpiry, currentPrice);
        setCumulativeVolumes(cumulativeVolumesResponse.volumes);
        setTimeLabels(cumulativeVolumesResponse.timeLabels);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockDataAndOptions();

    const interval = setInterval(() => {
      fetchStockDataAndOptions();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [stockSymbol]);

  // Fetch cumulative volume data for nearest expiry
  const fetchCumulativeVolume = async (contracts, currentPrice) => {
    const volumes = [];
    let timeLabels = [];

    try {
      // Create an array of promises to fetch the volume data for all contracts concurrently
      const volumePromises = contracts.map(async (contract, index) => {
        const volumeResponse = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
        );
        const volumeData = volumeResponse.data.results || [];

        // Set time labels only for the first contract's volume data
        if (index === 0 && volumeData.length > 0) {
          timeLabels = volumeData.map(item => new Date(item.t).toLocaleTimeString());
        }

        return volumeData;
      });

      const resolvedVolumes = await Promise.all(volumePromises);

      // Process the resolved volume data and accumulate volumes per minute
      resolvedVolumes.forEach(volumeData => {
        volumeData.forEach((item, index) => {
          volumes[index] = (volumes[index] || 0) + item.v;
        });
      });
    } catch (error) {
      console.error('Error fetching cumulative volume data:', error);
    }

    return { volumes, timeLabels };
  };

  // Helper function to get today’s date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Line chart data for stock price
  const stockChartData = {
    labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map((item) => item.c), // Y-axis (stock price)
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Bar chart data for puts volume
  const putsVolumeChartData = {
    labels: strikes, // X-axis (strike prices)
    datasets: [
      {
        label: isDollarMode ? 'Puts Dollar Amount' : 'Puts Volume',
        data: putsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for calls volume
  const callsVolumeChartData = {
    labels: strikes, // X-axis (strike prices)
    datasets: [
      {
        label: isDollarMode ? 'Calls Dollar Amount' : 'Calls Volume',
        data: callsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for cumulative options volume
  const optionsVolumeChartData = {
    labels: timeLabels, // X-axis (time)
    datasets: [
      {
        label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume',
        data: cumulativeVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>{stockSymbol} Stock and Options Tracker</h1>

      <input
        type="text"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol"
      />
      <p>Current Stock Price: {stockPrice}</p>

      <button onClick={() => setIsDollarMode(!isDollarMode)}>
        Toggle to {isDollarMode ? 'Volume' : 'Dollar'} Mode
      </button>

      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}

      <div>
        <h2>Stock Price Movement</h2>
        <Line data={stockChartData} />
      </div>

      <div>
        <h2>Options Volumes</h2>
        <h3>Puts Volume</h3>
        <Bar data={putsVolumeChartData} />
        <h3>Calls Volume</h3>
        <Bar data={callsVolumeChartData} />
      </div>

      <div>
        <h2>Cumulative Options Volume (Nearest Expiry)</h2>
        <Bar data={optionsVolumeChartData} />
      </div>
    </div>
  );
};

export default StockOptionsTracker;
