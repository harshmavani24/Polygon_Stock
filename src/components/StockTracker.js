// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line, Bar } from 'react-chartjs-2';
// // import 'chart.js/auto'; // Required for chart.js

// // const StockTracker = () => {
// //   const [symbol, setSymbol] = useState('');
// //   const [priceData, setPriceData] = useState([]);
// //   const [volumeData, setVolumeData] = useState([]);
// //   const [contractData, setContractData] = useState([]);
// //   const [toggleVolume, setToggleVolume] = useState(false); // Toggles between volume and dollar amount

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchStockData(symbol);
// //   };

// //   const fetchStockData = async (symbol) => {
// //     try {
// //       const now = new Date();
// //       const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
      
// //       // Convert to YYYY-MM-DD format as required by Polygon API
// //       const fromDate = tenMinutesAgo.toISOString().split('T')[0]; 
// //       const toDate = now.toISOString().split('T')[0]; 
  
// //       // Fetch stock price data
// //       const priceResponse = await axios.get(
// //         `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-09-20/2024-09-22?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );
      
// //       console.log("Price Response",priceResponse.data.results);
// //       setPriceData(priceResponse.data.results || []); // Update your price data state
  
// //       // Fetch volume data for the closest expiry date
// //       const volumeResponse = await axios.get(
// //         `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${symbol}&contract_type=all&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );
// //       console.log(volumeResponse.data.results);
  
// //       setVolumeData(volumeResponse.data.results || []); // Update your volume data state
// //     } catch (error) {
// //       if (error.response && error.response.status === 429) {
// //         // Handle rate limiting (Too Many Requests)
// //         console.error("Rate limit exceeded. Please wait or upgrade your subscription.");
        
// //         // Implement a retry after a delay (e.g., 60 seconds)
// //         setTimeout(() => {
// //           fetchStockData(symbol); // Retry fetching data after 60 seconds
// //         }, 6000); // Wait 60 seconds before retrying
// //       } else {
// //         console.error('Error fetching stock data:', error);
// //       }
// //     }
// //   };
  

// //   useEffect(() => {
// //     if (symbol) {
// //       const interval = setInterval(() => {
// //         fetchStockData(symbol);
// //       }, 5000); // Fetch every second
// //       return () => clearInterval(interval);
// //     }
// //   }, [symbol]);

// //   const priceChart = {
// //     labels: priceData.map((entry) => new Date(entry.t).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Stock Price',
// //         data: priceData.map((entry) => entry.c),
// //         fill: false,
// //         backgroundColor: 'rgba(75,192,192,0.4)',
// //         borderColor: 'rgba(75,192,192,1)',
// //       },
// //     ],
// //   };

// //   const volumeChart = {
// //     labels: volumeData.map((entry) => new Date(entry.expiration_date).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Call Volume',
// //         data: volumeData.map((entry) => entry.call_volume),
// //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
// //         borderColor: 'rgba(54, 162, 235, 1)',
// //         borderWidth: 1,
// //       },
// //       {
// //         label: 'Put Volume',
// //         data: volumeData.map((entry) => entry.put_volume),
// //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
// //         borderColor: 'rgba(255, 99, 132, 1)',
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter Stock Symbol"
// //           value={symbol}
// //           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
// //         />
// //         <button type="submit">Submit</button>
// //       </form>

// //       {priceData.length > 0 && (
// //         <>
// //           <h2>{symbol} Stock Price</h2>
// //           <Line data={priceChart} />
// //         </>
// //       )}

// //       {volumeData.length > 0 && (
// //         <>
// //           <h2>Volume Data</h2>
// //           <Bar data={volumeChart} />
// //         </>
// //       )}

// //       <button onClick={() => setToggleVolume(!toggleVolume)}>
// //         {toggleVolume ? 'Show Volume' : 'Show $ Amount'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default StockTracker;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line, Bar } from 'react-chartjs-2';
// // import 'chart.js/auto'; // Required for chart.js

// // const StockTracker = () => {
// //   const [symbol, setSymbol] = useState('');
// //   const [priceData, setPriceData] = useState([]);
// //   const [volumeData, setVolumeData] = useState([]);
// //   const [strikeData, setStrikeData] = useState([]); // For storing strike prices with Greeks
// //   const [toggleVolume, setToggleVolume] = useState(false); // Toggles between volume and $ amount

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchStockData(symbol);
// //   };

// //   const fetchStockData = async (symbol) => {
// //     try {
// //       const now = new Date();
// //       const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
// //       const fromDate = tenMinutesAgo.toISOString().split('T')[0];
// //       const toDate = now.toISOString().split('T')[0];
  
// //       // Fetch stock price data
// //       const priceResponse = await axios.get(
// //         `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-09-20/2024-09-20?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );
      
// //       setPriceData(priceResponse.data.results || []);
  
// //       // Fetch volume data for the closest expiry date
// //       const volumeResponse = await axios.get(
// //         `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${symbol}&contract_type=all&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );
  
// //       setVolumeData(volumeResponse.data.results || []);

// //     //   // Fetch Greeks (Delta, Gamma, Vega) and Strike Prices for options 10 above/below
// //     //   const strikeResponse = await axios.get(
// //     //     `https://api.polygon.io/v1/reference/options/greeks/${symbol}?apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //     //   );
  
// //     //   setStrikeData(strikeResponse.data.results || []);
      
// //     } catch (error) {
// //       console.error('Error fetching stock data:', error);
// //     }
// //   };
  
// //   useEffect(() => {
// //     if (symbol) {
// //       const interval = setInterval(() => {
// //         fetchStockData(symbol);
// //       }, 1000); // Fetch every second
// //       return () => clearInterval(interval);
// //     }
// //   }, [symbol]);

// //   // Function to calculate Dollar Amount based on Volume and Contract Price
// //   const calculateDollarAmount = (volume, contractPrice) => volume * 100 * contractPrice;

// //   const priceChart = {
// //     labels: priceData.map((entry) => new Date(entry.t).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Stock Price',
// //         data: priceData.map((entry) => entry.c),
// //         fill: false,
// //         backgroundColor: 'rgba(75,192,192,0.4)',
// //         borderColor: 'rgba(75,192,192,1)',
// //       },
// //     ],
// //   };

// //   const volumeChart = {
// //     labels: volumeData.map((entry) => new Date(entry.expiration_date).toLocaleDateString()), // Using date for better accuracy
// //     datasets: [
// //       {
// //         label: 'Call Volume',
// //         data: volumeData.map((entry) => 
// //           toggleVolume ? calculateDollarAmount(entry.call_volume, entry.contract_price) : entry.call_volume),
// //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
// //         borderColor: 'rgba(54, 162, 235, 1)',
// //         borderWidth: 1,
// //       },
// //       {
// //         label: 'Put Volume',
// //         data: volumeData.map((entry) => 
// //           toggleVolume ? calculateDollarAmount(entry.put_volume, entry.contract_price) : entry.put_volume),
// //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
// //         borderColor: 'rgba(255, 99, 132, 1)',
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   // Function to calculate percentage movement using Greeks
// //   const calculatePriceImpact = (greeks, priceChange) => {
// //     const delta = greeks.delta || 0;
// //     const gamma = greeks.gamma || 0;
// //     return (delta + 0.5 * gamma * priceChange) * 100; // Simplified formula using Delta & Gamma
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter Stock Symbol"
// //           value={symbol}
// //           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
// //         />
// //         <button type="submit">Submit</button>
// //       </form>

// //       {priceData.length > 0 && (
// //         <>
// //           <h2>{symbol} Stock Price</h2>
// //           <Line data={priceChart} />
// //         </>
// //       )}

// //       {volumeData.length > 0 && (
// //         <>
// //           <h2>Volume Data</h2>
// //           <Bar data={volumeChart} />
// //         </>
// //       )}

// //       {strikeData.length > 0 && (
// //         <>
// //           <h2>Strike Price Data with Greeks</h2>
// //           <ul>
// //             {strikeData.map((strike) => (
// //               <li key={strike.id}>
// //                 Strike: {strike.strike_price}, Delta: {strike.delta}, 
// //                 Impact (+1%): {calculatePriceImpact(strike, 0.01)}%, 
// //                 Impact (-1%): {calculatePriceImpact(strike, -0.01)}%
// //               </li>
// //             ))}
// //           </ul>
// //         </>
// //       )}

// //       <button onClick={() => setToggleVolume(!toggleVolume)}>
// //         {toggleVolume ? 'Show Volume' : 'Show $ Amount'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default StockTracker;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line, Bar } from 'react-chartjs-2';
// // import 'chart.js/auto'; // Required for chart.js

// // const StockTracker = () => {
// //   const [symbol, setSymbol] = useState('');
// //   const [priceData, setPriceData] = useState([]);
// //   const [volumeData, setVolumeData] = useState([]);
// //   const [strikeData, setStrikeData] = useState([]); // For storing strike prices with Greeks
// //   const [toggleVolume, setToggleVolume] = useState(false); // Toggles between volume and $ amount

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchStockData(symbol);
// //   };

// //   const fetchStockData = async (symbol) => {
// //     try {
// //       const now = new Date();
// //       const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
// //       const fromDate = tenMinutesAgo.toISOString().split('T')[0];
// //       const toDate = now.toISOString().split('T')[0];

// //       // Fetch stock price data
// //       const priceResponse = await axios.get(
// //         `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-09-20/${toDate}?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );

// //       setPriceData(priceResponse.data.results || []);

// //       // Fetch volume data for the closest expiry date
// //       const volumeResponse = await axios.get(
// //         `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${symbol}&contract_type=all&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );

// //       setVolumeData(volumeResponse.data.results || []);
      
// //     } catch (error) {
// //       console.error('Error fetching stock data:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (symbol) {
// //       const interval = setInterval(() => {
// //         fetchStockData(symbol);
// //       }, 1000); // Fetch every second
// //       return () => clearInterval(interval);
// //     }
// //   }, [symbol]);

// //   // Function to calculate Dollar Amount based on Volume and Contract Price
// //   const calculateDollarAmount = (volume, contractPrice) => volume * 100 * contractPrice;

// //   // Price chart configuration
// //   const priceChart = {
// //     labels: priceData.map((entry) => new Date(entry.t).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Stock Price',
// //         data: priceData.map((entry) => entry.c),
// //         fill: false,
// //         backgroundColor: 'rgba(75,192,192,0.4)',
// //         borderColor: 'rgba(75,192,192,1)',
// //       },
// //     ],
// //   };

// //   // Volume chart configuration with updated data based on `toggleVolume`
// //   const volumeChart = {
// //     labels: volumeData.map((entry) => new Date(entry.expiration_date).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Call Volume',
// //         data: volumeData.map((entry) =>
// //           toggleVolume ? calculateDollarAmount(entry.call_volume, entry.contract_price) : entry.call_volume
// //         ),
// //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
// //         borderColor: 'rgba(54, 162, 235, 1)',
// //         borderWidth: 1,
// //       },
// //       {
// //         label: 'Put Volume',
// //         data: volumeData.map((entry) =>
// //           toggleVolume ? calculateDollarAmount(entry.put_volume, entry.contract_price) : entry.put_volume
// //         ),
// //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
// //         borderColor: 'rgba(255, 99, 132, 1)',
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   // Function to calculate percentage movement using Greeks
// //   const calculatePriceImpact = (greeks, priceChange) => {
// //     const delta = greeks.delta || 0;
// //     const gamma = greeks.gamma || 0;
// //     return (delta + 0.5 * gamma * priceChange) * 100; // Simplified formula using Delta & Gamma
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter Stock Symbol"
// //           value={symbol}
// //           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
// //         />
// //         <button type="submit">Submit</button>
// //       </form>

// //       {priceData.length > 0 && (
// //         <>
// //           <h2>{symbol} Stock Price</h2>
// //           <Line data={priceChart} />
// //         </>
// //       )}

// //       {volumeData.length > 0 && (
// //         <>
// //           <h2>Volume Data</h2>
// //           <Bar data={volumeChart} />
// //         </>
// //       )}

// //       {strikeData.length > 0 && (
// //         <>
// //           <h2>Strike Price Data with Greeks</h2>
// //           <ul>
// //             {strikeData.map((strike) => (
// //               <li key={strike.id}>
// //                 Strike: {strike.strike_price}, Delta: {strike.delta}, 
// //                 Impact (+1%): {calculatePriceImpact(strike, 0.01)}%, 
// //                 Impact (-1%): {calculatePriceImpact(strike, -0.01)}%
// //               </li>
// //             ))}
// //           </ul>
// //         </>
// //       )}

// //       {/* Toggle Button */}
// //       <button onClick={() => setToggleVolume(!toggleVolume)}>
// //         {toggleVolume ? 'Show Volume' : 'Show $ Amount'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default StockTracker;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line, Bar } from 'react-chartjs-2';
// // import 'chart.js/auto'; // Required for chart.js

// // const StockTracker = () => {
// //   const [symbol, setSymbol] = useState('');
// //   const [priceData, setPriceData] = useState([]);
// //   const [volumeData, setVolumeData] = useState([]);
// //   const [strikeData, setStrikeData] = useState([]); // For storing strike prices with Greeks
// //   const [toggleVolume, setToggleVolume] = useState(false); // Toggles between volume and $ amount

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchStockData(symbol);
// //   };

// //   const fetchStockData = async (symbol) => {
// //     try {
// //       const now = new Date();
// //       const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
// //       const fromDate = tenMinutesAgo.toISOString().split('T')[0];
// //       const toDate = now.toISOString().split('T')[0];

// //       // Fetch stock price data
// //       const priceResponse = await axios.get(
// //         `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-09-20/${toDate}?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );

// //       setPriceData(priceResponse.data.results || []);

// //       // Fetch volume data for the closest expiry date
// //       const volumeResponse = await axios.get(
// //         `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${symbol}&contract_type=all&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );
// //       console.log(volumeResponse.data.results);

// //       setVolumeData(volumeResponse.data.results || []);
      
// //     } catch (error) {
// //       console.error('Error fetching stock data:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (symbol) {
// //       const interval = setInterval(() => {
// //         fetchStockData(symbol);
// //       }, 1000); // Fetch every second
// //       return () => clearInterval(interval);
// //     }
// //   }, [symbol]);

// //   // Function to calculate Dollar Amount based on Volume and Contract Price
// //   const calculateDollarAmount = (volume, contractPrice) => volume * 100 * contractPrice;

// //   // Price chart configuration
// //   const priceChart = {
// //     labels: priceData.map((entry) => new Date(entry.t).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Stock Price',
// //         data: priceData.map((entry) => entry.c),
// //         fill: false,
// //         backgroundColor: 'rgba(75,192,192,0.4)',
// //         borderColor: 'rgba(75,192,192,1)',
// //       },
// //     ],
// //   };

// //   // Volume chart configuration with updated data based on `toggleVolume`
// //   const volumeChart = {
// //     labels: volumeData.map((entry) => new Date(entry.expiration_date).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Call Volume',
// //         data: volumeData.map((entry) =>
// //           toggleVolume ? calculateDollarAmount(entry.call_volume, entry.contract_price) : entry.call_volume
// //         ),
// //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
// //         borderColor: 'rgba(54, 162, 235, 1)',
// //         borderWidth: 1,
// //       },
// //       {
// //         label: 'Put Volume',
// //         data: volumeData.map((entry) =>
// //           toggleVolume ? calculateDollarAmount(entry.put_volume, entry.contract_price) : entry.put_volume
// //         ),
// //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
// //         borderColor: 'rgba(255, 99, 132, 1)',
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   // Function to calculate percentage movement using Greeks
// //   const calculatePriceImpact = (greeks, priceChange) => {
// //     const delta = greeks.delta || 0;
// //     const gamma = greeks.gamma || 0;
// //     return (delta + 0.5 * gamma * priceChange) * 100; // Simplified formula using Delta & Gamma
// //   };

// //   const handleToggleVolume = () => {
// //     setToggleVolume((prevState) => {
// //       const newToggleState = !prevState;
// //       console.log('Toggle Volume Button Clicked: ', newToggleState);
// //       console.log('Volume Data: ', volumeData);
// //       console.log('Price Data: ', priceData);
// //       return newToggleState;
// //     });
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter Stock Symbol"
// //           value={symbol}
// //           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
// //         />
// //         <button type="submit">Submit</button>
// //       </form>

// //       {/* Display stock price graph */}
// //       {priceData.length > 0 && (
// //         <>
// //           <h2>{symbol} Stock Price</h2>
// //           <Line data={priceChart} />
// //         </>
// //       )}

// //       {/* Display volume/dollar amount graph */}
// //       {volumeData.length > 0 && (
// //         <>
// //           <h2>Volume Data</h2>
// //           <Bar data={volumeChart} />
// //         </>
// //       )}

// //       {/* Display strike data */}
// //       {strikeData.length > 0 && (
// //         <>
// //           <h2>Strike Price Data with Greeks</h2>
// //           <ul>
// //             {strikeData.map((strike) => (
// //               <li key={strike.id}>
// //                 Strike: {strike.strike_price}, Delta: {strike.delta}, 
// //                 Impact (+1%): {calculatePriceImpact(strike, 0.01)}%, 
// //                 Impact (-1%): {calculatePriceImpact(strike, -0.01)}%
// //               </li>
// //             ))}
// //           </ul>
// //         </>
// //       )}

// //       {/* Toggle button to switch between volume and dollar amount */}
// //       <button onClick={handleToggleVolume}>
// //         {toggleVolume ? 'Show Volume' : 'Show $ Amount'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default StockTracker;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line, Bar } from 'react-chartjs-2';
// // import 'chart.js/auto'; // Required for chart.js

// // const StockTracker = () => {
// //   const [symbol, setSymbol] = useState('');
// //   const [priceData, setPriceData] = useState([]);
// //   const [optionData, setOptionData] = useState([]); // For storing option data
// //   const [toggleVolume, setToggleVolume] = useState(false); // Toggles between volume and $ amount

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchStockData(symbol);
// //   };
// // //   Right now the marrcket is c
// // //   const fetchStockData = async (symbol) => {
// // //     try {
// // //       const now = new Date();
// // //       const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // Fetching last 10 minutes of data
// // //       const fromDate = tenMinutesAgo.toISOString().split('T')[0];
// // //       const toDate = now.toISOString().split('T')[0];
  
// // //       // Fetch stock price data
// // //       const priceResponse = await axios.get(
// // //         `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// // //       );
      
// // //       setPriceData(priceResponse.data.results || []);
// // //     } catch (error) {
// // //       console.error('Error fetching stock data:', error);
// // //     }
// // //   };
  

// //   const fetchStockData = async (symbol) => {
// //     try {
// //       const now = new Date();
// //       const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
// //       const fromDate = tenMinutesAgo.toISOString().split('T')[0];
// //       const toDate = now.toISOString().split('T')[0];

// //       // Fetch stock price data
// //       const priceResponse = await axios.get(
// //         `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-09-20/${toDate}?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );
      
// //       setPriceData(priceResponse.data.results || []);

// //       // Fetch option data from your provided API URL
// //       const optionResponse = await axios.get(
// //         `https://api.polygon.io/v2/aggs/ticker/O:${symbol}251219C00650000/range/1/day/2024-09-10/${toDate}?adjusted=true&sort=asc&apiKey=_grbZQMP5kasPyiTvmUtApzQ5dapTGSu`
// //       );

// //       setOptionData(optionResponse.data.results || []); // Store option data
      
// //     } catch (error) {
// //       console.error('Error fetching stock or option data:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (symbol) {
// //       const interval = setInterval(() => {
// //         fetchStockData(symbol);
// //       }, 1000); // Fetch every second
// //       return () => clearInterval(interval);
// //     }
// //   }, [symbol]);

// //   // Function to calculate Dollar Amount based on Volume and Contract Price
// //   const calculateDollarAmount = (volume, contractPrice) => volume * 100 * contractPrice;

// //   // Price chart configuration
// //   const priceChart = {
// //     labels: priceData.map((entry) => new Date(entry.t).toLocaleTimeString()),
// //     datasets: [
// //       {
// //         label: 'Stock Price',
// //         data: priceData.map((entry) => entry.c),
// //         fill: false,
// //         backgroundColor: 'rgba(75,192,192,0.4)',
// //         borderColor: 'rgba(75,192,192,1)',
// //       },
// //     ],
// //   };



// //   // Function to toggle between showing volume or dollar amount in option chart
// //   const handleToggleVolume = () => {
// //     setToggleVolume((prevState) => !prevState);
// //     console.log('Toggle Volume Button Clicked:', toggleVolume);
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter Stock Symbol"
// //           value={symbol}
// //           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
// //         />
// //         <button type="submit">Submit</button>
// //       </form>

// //       {/* Display stock price graph */}
// //       {priceData.length > 0 && (
// //         <>
// //           <h2>{symbol} Stock Price</h2>
// //           <Line data={priceChart} />
// //         </>
// //       )}


// //     </div>
// //   );
// // };

// // export default StockTracker;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev?adjusted=true&apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.results[0].c;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];
//         console.log("Contracts",contracts);
        
//         // Filter contracts based on strikes around current stock price (±10)
//         const filteredContracts = contracts.filter(
//           (contract) =>
//             contract.expiration_date === '2024-09-27'
//             // && contract.strike_price >= currentPrice - 5 && 
//             // contract.strike_price <= currentPrice + 5
//         );
//         console.log("Currunet Price",currentPrice);
//         console.log("Filtered Contracts",filteredContracts);
//         setOptionContracts(filteredContracts);

//         // Fetch cumulative volume data for each contract
//         const volumes = [];
//         const timeLabels = [];
//         for (let i = 0; i < filteredContracts.length; i++) {
//           const contract = filteredContracts[i];
//           const volumeResponse = await axios.get(
//             `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//           );
//           const volumeData = volumeResponse.data.results || [];
//           console.log("Volume Data",volumeData);

//           // Set time labels once (for X-axis)
//           if (i === 0 && volumeData.length > 0) {
//             timeLabels.push(...volumeData.map(item => new Date(item.t).toLocaleTimeString()));
//           }

//           // Accumulate the volume for each minute across all contracts
//           volumeData.forEach((item, index) => {
//             volumes[index] = (volumes[index] || 0) + item.v;
//           });
//         }

//         setCumulativeVolumes(volumes);
//         setTimeLabels(timeLabels);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: 'Cumulative Volume',
//         data: cumulativeVolumes, // Y-axis (volume)
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Expiration Date 2024-09-27</h3>
//         {cumulativeVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];

//         // Find the soonest expiration date
//         const soonestExpiryDate = contracts
//           .map(contract => contract.expiration_date)
//           .sort()[0];

//         console.log("Soonest Expiry Date",soonestExpiryDate);

//         // Filter contracts based on strikes around current stock price (±10)
//         const sortedContracts = contracts.sort((a, b) => parseFloat(a.strike_price) - parseFloat(b.strike_price));

//     // Find the closest strike price to the current price
//     const closestContractIndex = sortedContracts.findIndex(contract => parseFloat(contract.strike_price) >= currentPrice);

//     // Select 10 strikes below and 10 strikes above
//     const start = Math.max(0, closestContractIndex - 10);
//     const end = Math.min(sortedContracts.length, closestContractIndex + 10);
//     const filteredContracts = sortedContracts.slice(start, end);

//     console.log("Filtered Contracts (10 above and 10 below):", filteredContracts); // Log filtered contracts
//     setOptionContracts(filteredContracts);

//         console.log("Currunet Price",currentPrice);
//         console.log("Filtered Contracts",filteredContracts);
        

//         // Fetch cumulative volume data for each contract
//         if (filteredContracts.length > 0) {
//             const volumes = [];
//             const timeLabels = [];
//             for (let i = 0; i < filteredContracts.length; i++) {
//               const contract = filteredContracts[i];
//               const volumeResponse = await axios.get(
//                 `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//               );
//               const volumeData = volumeResponse.data.results || [];
//               console.log("Volume Data for contract", contract.ticker, volumeData); // Log volume data for each contract
      
//               // Set time labels once (for X-axis)
//               if (i === 0 && volumeData.length > 0) {
//                 timeLabels.push(...volumeData.map(item => new Date(item.t).toLocaleTimeString()));
//               }
      
//               // Accumulate the volume for each minute across all contracts
//               volumeData.forEach((item, index) => {
//                 volumes[index] = (volumes[index] || 0) + item.v;
//               });
//             }
      
//             setCumulativeVolumes(volumes);
//             setTimeLabels(timeLabels);
//             }  else {
//                 console.log("No contracts found within the 10 above and below strike price range.");
//               }

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: 'Cumulative Volume',
//         data: cumulativeVolumes, // Y-axis (volume)
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {cumulativeVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];

//         // Find the soonest expiration date
//         const soonestExpiryDate = contracts
//           .map(contract => contract.expiration_date)
//           .sort()[0];

//         console.log("Soonest Expiry Date", soonestExpiryDate);

//         // Filter contracts based on strikes around current stock price (±10)
//         const sortedContracts = contracts.sort((a, b) => parseFloat(a.strike_price) - parseFloat(b.strike_price));

//         // Find the closest strike price to the current price
//         const closestContractIndex = sortedContracts.findIndex(contract => parseFloat(contract.strike_price) >= currentPrice);

//         // Select 10 strikes below and 10 strikes above
//         const start = Math.max(0, closestContractIndex - 10);
//         const end = Math.min(sortedContracts.length, closestContractIndex + 10);
//         const filteredContracts = sortedContracts.slice(start, end);

//         console.log("Filtered Contracts (10 above and 10 below):", filteredContracts); // Log filtered contracts
//         setOptionContracts(filteredContracts);

//         console.log("Current Price", currentPrice);
//         console.log("Filtered Contracts", filteredContracts);

//         // Fetch cumulative volume data for each contract
//         if (filteredContracts.length > 0) {
//           const volumes = [];
//           const timeLabels = [];
//           for (let i = 0; i < filteredContracts.length; i++) {
//             const contract = filteredContracts[i];
//             const volumeResponse = await axios.get(
//               `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//             );
//             const volumeData = volumeResponse.data.results || [];
//             console.log("Volume Data for contract", contract.ticker, volumeData); // Log volume data for each contract

//             // Set time labels once (for X-axis)
//             if (i === 0 && volumeData.length > 0) {
//               timeLabels.push(...volumeData.map(item => new Date(item.t).toLocaleTimeString()));
//             }

//             // Accumulate the volume for each minute across all contracts
//             volumeData.forEach((item, index) => {
//               volumes[index] = (volumes[index] || 0) + item.v;
//             });
//           }

//           setCumulativeVolumes(volumes);
//           setTimeLabels(timeLabels);
//         } else {
//           console.log("No contracts found within the 10 above and below strike price range.");
//         }

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: 'Cumulative Volume',
//         data: cumulativeVolumes, // Y-axis (volume)
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {cumulativeVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// // Black-Scholes Greeks calculations
// const blackScholesGreeks = (S, K, T, r, sigma, optionType) => {
//     const d1 = (Math.log(S / K) + (r + (sigma ** 2) / 2) * T) / (sigma * Math.sqrt(T));
//     const d2 = d1 - sigma * Math.sqrt(T);
//     const phi = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x ** 2);
  
//     const delta = optionType === 'call' ? phi(d1) : phi(d1) - 1;
//     return { delta };
//   };

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];

//         // Find the soonest expiration date
//         const soonestExpiryDate = contracts
//           .map(contract => contract.expiration_date)
//           .sort()[0];

//         console.log("Soonest Expiry Date", soonestExpiryDate);

//         // Filter contracts based on strikes around current stock price (±10)
//         const sortedContracts = contracts.sort((a, b) => parseFloat(a.strike_price) - parseFloat(b.strike_price));

//         // Find the closest strike price to the current price
//         const closestContractIndex = sortedContracts.findIndex(contract => parseFloat(contract.strike_price) >= currentPrice);

//         // Select 10 strikes below and 10 strikes above
//         const start = Math.max(0, closestContractIndex - 10);
//         const end = Math.min(sortedContracts.length, closestContractIndex + 10);
//         const filteredContracts = sortedContracts.slice(start, end);

//         console.log("Filtered Contracts (10 above and 10 below):", filteredContracts); // Log filtered contracts
//         setOptionContracts(filteredContracts);

//         console.log("Current Price", currentPrice);
//         console.log("Filtered Contracts", filteredContracts);

//         // Fetch cumulative volume data for each contract
//         if (filteredContracts.length > 0) {
//           const volumes = [];
//           const timeLabels = [];
//           for (let i = 0; i < filteredContracts.length; i++) {
//             const contract = filteredContracts[i];
//             const volumeResponse = await axios.get(
//               `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//             );
//             const volumeData = volumeResponse.data.results || [];
//             console.log("Volume Data for contract", contract.ticker, volumeData); // Log volume data for each contract

//             // Set time labels once (for X-axis)
//             if (i === 0 && volumeData.length > 0) {
//               timeLabels.push(...volumeData.map(item => new Date(item.t).toLocaleTimeString()));
//             }

//             // Accumulate the volume for each minute across all contracts
//             volumeData.forEach((item, index) => {
//               volumes[index] = (volumes[index] || 0) + item.v;
//             });
//           }

//           setCumulativeVolumes(volumes);
//           setTimeLabels(timeLabels);
//         } else {
//           console.log("No contracts found within the 10 above and below strike price range.");
//         }

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: 'Cumulative Volume',
//         data: cumulativeVolumes, // Y-axis (volume)
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {cumulativeVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}

        
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// // Black-Scholes Greeks calculations
// const blackScholesGreeks = (S, K, T, r, sigma, optionType) => {
//   const d1 = (Math.log(S / K) + (r + (sigma ** 2) / 2) * T) / (sigma * Math.sqrt(T));
//   const d2 = d1 - sigma * Math.sqrt(T);
//   const phi = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x ** 2);

//   const delta = optionType === 'call' ? phi(d1) : phi(d1) - 1;
//   return { delta };
// };

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];

//         // Find the soonest expiration date
//         const soonestExpiryDate = contracts
//           .map(contract => contract.expiration_date)
//           .sort()[0];

//         console.log("Soonest Expiry Date", soonestExpiryDate);

//         // Filter contracts based on strikes around current stock price (±10)
//         const sortedContracts = contracts.sort((a, b) => parseFloat(a.strike_price) - parseFloat(b.strike_price));

//         // Find the closest strike price to the current price
//         const closestContractIndex = sortedContracts.findIndex(contract => parseFloat(contract.strike_price) >= currentPrice);

//         // Select 10 strikes below and 10 strikes above
//         const start = Math.max(0, closestContractIndex - 10);
//         const end = Math.min(sortedContracts.length, closestContractIndex + 10);
//         const filteredContracts = sortedContracts.slice(start, end);

//         console.log("Filtered Contracts (10 above and 10 below):", filteredContracts); // Log filtered contracts
//         setOptionContracts(filteredContracts);

//         console.log("Current Price", currentPrice);
//         console.log("Filtered Contracts", filteredContracts);

//         // Fetch cumulative volume data for each contract
//         if (filteredContracts.length > 0) {
//           const volumes = [];
//           const timeLabels = [];
//           for (let i = 0; i < filteredContracts.length; i++) {
//             const contract = filteredContracts[i];
//             const volumeResponse = await axios.get(
//               `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//             );
//             const volumeData = volumeResponse.data.results || [];
//             console.log("Volume Data for contract", contract.ticker, volumeData); // Log volume data for each contract

//             // Set time labels once (for X-axis)
//             if (i === 0 && volumeData.length > 0) {
//               timeLabels.push(...volumeData.map(item => new Date(item.t).toLocaleTimeString()));
//             }

//             // Accumulate the volume for each minute across all contracts
//             volumeData.forEach((item, index) => {
//               volumes[index] = (volumes[index] || 0) + item.v;
//             });
//           }

//           setCumulativeVolumes(volumes);
//           setTimeLabels(timeLabels);
//         } else {
//           console.log("No contracts found within the 10 above and below strike price range.");
//         }

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume',
//         data: cumulativeVolumes.map((volume, index) =>
//           isDollarMode ? volume * 100 * stockPrice : volume
//         ), // Convert to dollar amount if isDollarMode is true
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {cumulativeVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}

//         <h3 style={{ marginTop: '40px' }}>Option Chain with 1% Move Estimation</h3>
//         {optionContracts.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Strike</th>
//                 <th>Call LTP</th>
//                 <th>Put LTP</th>
//                 <th>IV</th>
//                 <th>1% Up Estimation</th>
//                 <th>1% Down Estimation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {optionContracts.map((contract, index) => {
//                 const T = (new Date(contract.expiration_date).getTime() - new Date().getTime()) / (365 * 24 * 60 * 60 * 1000); // Time to expiration in years
//                 const greeks = blackScholesGreeks(
//                   stockPrice,
//                   parseFloat(contract.strike_price),
//                   T,
//                   0.05, // Assuming 5% risk-free rate
//                   parseFloat(contract.implied_volatility) / 100,
//                   'call'
//                 );
//                 const delta = greeks.delta;
//                 const moveUp = stockPrice * 1.01;
//                 const moveDown = stockPrice * 0.99;

//                 return (
//                   <tr key={index}>
//                     <td>{contract.strike_price}</td>
//                     <td>{contract.call_last_traded_price}</td>
//                     <td>{contract.put_last_traded_price}</td>
//                     <td>{contract.implied_volatility}%</td>
//                     <td>{moveUp.toFixed(2)}</td>
//                     <td>{moveDown.toFixed(2)}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ) : (
//           <p>No option contracts available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// // Black-Scholes Greeks calculations
// const blackScholesGreeks = (S, K, T, r, sigma, optionType) => {
//     const d1 = (Math.log(S / K) + (r + (sigma ** 2) / 2) * T) / (sigma * Math.sqrt(T));
//     const d2 = d1 - sigma * Math.sqrt(T);
//     const phi = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x ** 2);
  
//     // Greeks calculations
//     const delta = optionType === 'call' ? phi(d1) : phi(d1) - 1;
//     const vega = S * Math.sqrt(T) * phi(d1); // Vega represents the sensitivity to volatility
//     const gamma = phi(d1) / (S * sigma * Math.sqrt(T)); // Gamma for sensitivity to delta changes
  
//     return { delta, gamma, vega };
//   };
  

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-20/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];

//         // Find the soonest expiration date
//         const soonestExpiryDate = contracts
//           .map(contract => contract.expiration_date)
//           .sort()[0];

//         // Filter contracts based on strikes around current stock price (±10)
//         const sortedContracts = contracts.sort((a, b) => parseFloat(a.strike_price) - parseFloat(b.strike_price));

//         // Find the closest strike price to the current price
//         const closestContractIndex = sortedContracts.findIndex(contract => parseFloat(contract.strike_price) >= currentPrice);

//         // Select 10 strikes below and 10 strikes above
//         const start = Math.max(0, closestContractIndex - 10);
//         const end = Math.min(sortedContracts.length, closestContractIndex + 10);
//         const filteredContracts = sortedContracts.slice(start, end);

//         setOptionContracts(filteredContracts);

//         // Fetch cumulative volume data for each contract
//         if (filteredContracts.length > 0) {
//             const volumes = [];
//             let timeLabels = [];
          
//             try {
//               // Create an array of promises to fetch the volume data for all contracts concurrently
//               const volumePromises = filteredContracts.map(async (contract, index) => {
//                 const volumeResponse = await axios.get(
//                   `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//                 );
          
//                 const volumeData = volumeResponse.data.results || [];
          
//                 // Set time labels only for the first contract's volume data
//                 if (index === 0 && volumeData.length > 0) {
//                   timeLabels = volumeData.map(item => new Date(item.t).toLocaleTimeString());
//                 }
          
//                 // Return the volume data for further processing
//                 return volumeData;
//               });
          
//               // Wait for all the promises to resolve concurrently
//               const resolvedVolumes = await Promise.all(volumePromises);
          
//               // Process the resolved volume data and accumulate volumes per minute
//               resolvedVolumes.forEach(volumeData => {
//                 volumeData.forEach((item, index) => {
//                   volumes[index] = (volumes[index] || 0) + item.v;
//                 });
//               });
          
//               // Update the state with accumulated volumes and time labels
//               setCumulativeVolumes(volumes);
//               setTimeLabels(timeLabels);
          
//             } catch (error) {
//               console.error('Error fetching cumulative volume data:', error);
//             }
//           }
          
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume',
//         data: cumulativeVolumes.map((volume, index) =>
//           isDollarMode ? volume * 100 * stockPrice : volume
//         ), // Convert to dollar amount if isDollarMode is true
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {cumulativeVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}

//         <h3 style={{ marginTop: '40px' }}>Option Chain with 1% Move Estimation</h3>
//         {optionContracts.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Strike</th>
//                 <th>IV</th>
//                 <th>1% Up Estimation</th>
//                 <th>1% Down Estimation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {optionContracts.map((contract, index) => {
//                 const T = (new Date(contract.expiration_date).getTime() - new Date().getTime()) / (365 * 24 * 60 * 60 * 1000); // Time to expiration in years
//                 const greeks = blackScholesGreeks(
//                   stockPrice,
//                   parseFloat(contract.strike_price),
//                   T,
//                   0.05, // Assuming 5% risk-free rate
//                   contract.iv / 100,
//                   contract.option_type
//                 );

//                 return (
//                   <tr key={index}>
//                     <td>{contract.strike_price}</td>
//                     <td>{contract.iv}</td>
//                     <td>{(greeks.delta * 1.01).toFixed(2)}</td>
//                     <td>{(greeks.delta * 0.99).toFixed(2)}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ) : (
//           <p>No options contracts data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [cumulativeVolumes, setCumulativeVolumes] = useState([]); // Cumulative volume data
//   const [putsVolumes, setPutsVolumes] = useState([]); // Cumulative puts volume data
//   const [callsVolumes, setCallsVolumes] = useState([]); // Cumulative calls volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-20/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options contracts for the soonest expiration
//         const optionsResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );
//         const contracts = optionsResponse.data.results || [];

//         // Find the soonest expiration date
//         const soonestExpiryDate = contracts
//           .map(contract => contract.expiration_date)
//           .sort()[0];

//         // Filter contracts based on strikes around current stock price (±10)
//         const sortedContracts = contracts.sort((a, b) => parseFloat(a.strike_price) - parseFloat(b.strike_price));

//         // Find the closest strike price to the current price
//         const closestContractIndex = sortedContracts.findIndex(contract => parseFloat(contract.strike_price) >= currentPrice);

//         // Select 10 strikes below and 10 strikes above
//         const start = Math.max(0, closestContractIndex - 10);
//         const end = Math.min(sortedContracts.length, closestContractIndex + 10);
//         const filteredContracts = sortedContracts.slice(start, end);

//         setOptionContracts(filteredContracts);

//         // Fetch cumulative volume data for each contract
//         if (filteredContracts.length > 0) {
//             const puts = [];
//             const calls = [];
//             const volumes = [];
//             let timeLabels = [];
          
//             try {
//               // Create an array of promises to fetch the volume data for all contracts concurrently
//               const volumePromises = filteredContracts.map(async (contract, index) => {
//                 const volumeResponse = await axios.get(
//                   `https://api.polygon.io/v2/aggs/ticker/${contract.ticker}/range/1/minute/2024-09-10/${getTodayDate()}?adjusted=true&apiKey=${polygonApiKey}`
//                 );
          
//                 const volumeData = volumeResponse.data.results || [];
          
//                 // Set time labels only for the first contract's volume data
//                 if (index === 0 && volumeData.length > 0) {
//                   timeLabels = volumeData.map(item => new Date(item.t).toLocaleTimeString());
//                 }
          
//                 // Store volumes for puts and calls
//                 if (contract.contract_type === 'put') {
//                   volumeData.forEach(item => {
//                     puts.push(item.v);
//                   });
//                 } else if (contract.contract_type === 'call') {
//                   volumeData.forEach(item => {
//                     calls.push(item.v);
//                   });
//                 }
          
//                 // Return the volume data for further processing
//                 return volumeData;
//               });
          
//               // Wait for all the promises to resolve concurrently
//               await Promise.all(volumePromises);
          
//               // Process the resolved volume data and accumulate volumes
//               setPutsVolumes(puts);
//               setCallsVolumes(calls);
//               setCumulativeVolumes(volumes);
//               setTimeLabels(timeLabels);
          
//             } catch (error) {
//               console.error('Error fetching cumulative volume data:', error);
//             }
//           }
          
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume (Puts)',
//         data: putsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume (Calls)',
//         data: callsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {putsVolumes.length > 0 || callsVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;


// last given result of server uploaded data on stock.nuviontech.com:3000 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [optionContracts, setOptionContracts] = useState([]); // Option contracts data
//   const [putsVolumes, setPutsVolumes] = useState([]); // Cumulative puts volume data
//   const [callsVolumes, setCallsVolumes] = useState([]); // Cumulative calls volume data
//   const [timeLabels, setTimeLabels] = useState([]); // X-axis labels (time)
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for the latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-20/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options data dynamically based on stock's current price
//         const strikesResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );

//         const expirationDate = '2024-09-27'; // Example expiration date
//         const soonestExpiry = strikesResponse.data.results.reduce((prev, curr) => {
//             return new Date(curr.expiration_date) < new Date(prev.expiration_date) ? curr : prev;
//         }, strikesResponse.data.results[0]).expiration_date;

//         const strikesForExpiry = strikesResponse.data.results.filter(
//             contract => contract.expiration_date === soonestExpiry
            
//         );
//         const strikes = strikesForExpiry.map(contract => contract.strike_price);

//         console.log('All Strikes:', strikes); // Log all strikes
//         // Find 10 strikes closest to the current price (5 above and 5 below)
//         const closestStrikes = strikes.sort((a, b) => Math.abs(a - currentPrice) - Math.abs(b - currentPrice)).slice(0, 10); // Select the closest 10 strikes

//         console.log('Closest Strikes:', closestStrikes); // Log closest strikes


//         // Fetch option volumes for these strikes
//         const volumePromises = closestStrikes.flatMap(strike =>
//           ['call', 'put'].map(async (contractType) => {
//             const response = await axios.get(
//               `https://api.polygon.io/v3/snapshot/options/${stockSymbol}?strike_price=${strike}&expiration_date=${expirationDate}&contract_type=${contractType}&order=asc&limit=10&sort=strike_price&apiKey=${polygonApiKey}`
//             );
//             return response.data.results || [];
//           })
//         );

//         // Wait for all promises to resolve
//         const allVolumes = await Promise.all(volumePromises);
//         console.log('All Volumes:', allVolumes); // Log all volumes

//         // Process the data to accumulate volumes
//         const puts = [];
//         const calls = [];
//         let timeLabels = [];

//         allVolumes.forEach((resultList) => {
//           resultList.forEach(contract => {
//             if (contract.details.contract_type === 'put') {
//               puts.push(contract.day.volume);
//             } else if (contract.details.contract_type === 'call') {
//               calls.push(contract.day.volume);
//             }

//             if (timeLabels.length === 0 && contract.day.last_updated) {
//               const timestamp = contract.day.last_updated / 1e9; // Convert nanoseconds to seconds
//               timeLabels.push(new Date(timestamp * 1000).toLocaleTimeString());
//             }
//           });
//         });
//         for (let i = 0; i < 10; i++) {
//             if (puts[i] === undefined) {
//                 puts[i] = 0;
//             }
//         }
//         for (let i = 0; i < 10; i++) {
//             if (calls[i] === undefined) {
//                 calls[i] = 0;
//             }
//         }
//         for (let i = 1; i < 10; i++) {
//             puts[0] = puts[0] + puts[i];
//             calls[0] = calls[0] + calls[i];
//         }
//         console.log('Puts:', puts); // Log puts
//         console.log('Calls:', calls); // Log calls

//         setPutsVolumes(puts);
//         setCallsVolumes(calls);
//         setTimeLabels(timeLabels);

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);


//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for cumulative options volume
//   const optionsVolumeChartData = {
//     labels: timeLabels, // X-axis (time)
//     datasets: [
//       {
//         label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume (Puts)',
//         data: putsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: isDollarMode ? 'Cumulative Dollar Amount' : 'Cumulative Volume (Calls)',
//         data: callsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Options Cumulative Volume for Nearest Expiry</h3>
//         {putsVolumes.length > 0 || callsVolumes.length > 0 ? (
//           <Bar data={optionsVolumeChartData} />
//         ) : (
//           <p>No cumulative volume data available</p>
//         )}
        
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [strikes, setStrikes] = useState([]); // Strike prices
//   const [putsVolumes, setPutsVolumes] = useState([]); // Puts volume data per strike
//   const [callsVolumes, setCallsVolumes] = useState([]); // Calls volume data per strike
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for the latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-20/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options data dynamically based on stock's current price
//         const strikesResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );

//         const expirationDate = '2024-09-27'; // Example expiration date
//         const soonestExpiry = strikesResponse.data.results.reduce((prev, curr) => {
//           return new Date(curr.expiration_date) < new Date(prev.expiration_date) ? curr : prev;
//         }, strikesResponse.data.results[0]).expiration_date;

//         const strikesForExpiry = strikesResponse.data.results.filter(
//           contract => contract.expiration_date === soonestExpiry
//         );
//         const allStrikes = strikesForExpiry.map(contract => contract.strike_price);

//         // Find 10 strikes closest to the current price (5 above and 5 below)
//         const closestStrikes = allStrikes.sort((a, b) => Math.abs(a - currentPrice) - Math.abs(b - currentPrice)).slice(0, 10);

//         console.log('Closest Strikes:', closestStrikes); // Log closest strikes
//         // Fetch option volumes for these strikes
//         const volumePromises = closestStrikes.flatMap(strike =>
//           ['call', 'put'].map(async (contractType) => {
//             const response = await axios.get(
//               `https://api.polygon.io/v3/snapshot/options/${stockSymbol}?strike_price=${strike}&expiration_date=${expirationDate}&contract_type=${contractType}&order=asc&limit=10&sort=strike_price&apiKey=${polygonApiKey}`
//             );
//             return response.data.results || [];
//           })
//         );

//         const allVolumes = await Promise.all(volumePromises);

//         const puts = [];
//         const calls = [];
//         const strikePrices = [];

//         allVolumes.forEach((resultList, index) => {
//             puts[index] = 0;  // Default volume is 0
//             calls[index] = 0; // Default volume is 0

//           resultList.forEach(contract => {
//             if (contract.details.contract_type === 'put') {
//               puts[index] = contract.day.volume || 0;
//             } else if (contract.details.contract_type === 'call') {
//               calls[index] = contract.day.volume || 0;
//             }
//             strikePrices[index] = contract.details.strike_price; // Store the strike price
//           });
//         });
//         console.log('All Volumes:', allVolumes); // Log all volumes
//         console.log('Puts:', puts); // Log puts
//         console.log('Calls:', calls); // Log calls

//         setPutsVolumes(puts);
//         setCallsVolumes(calls);
//         setStrikes(strikePrices);

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for puts volume
//   const putsVolumeChartData = {
//     labels: strikes, // X-axis (strike prices)
//     datasets: [
//       {
//         label: isDollarMode ? 'Puts Dollar Amount' : 'Puts Volume',
//         data: putsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Bar chart data for calls volume
//   const callsVolumeChartData = {
//     labels: strikes, // X-axis (strike prices)
//     datasets: [
//       {
//         label: isDollarMode ? 'Calls Dollar Amount' : 'Calls Volume',
//         data: callsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         <h3 style={{ marginTop: '40px' }}>Puts Volume by Strike Price</h3>
//         {putsVolumes.length > 0 ? (
//           <Bar data={putsVolumeChartData} />
//         ) : (
//           <p>No puts volume data available</p>
//         )}

//         <h3 style={{ marginTop: '40px' }}>Calls Volume by Strike Price</h3>
//         {callsVolumes.length > 0 ? (
//           <Bar data={callsVolumeChartData} />
//         ) : (
//           <p>No calls volume data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const StockOptionsTracker = () => {
//   const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol
//   const [stockPrice, setStockPrice] = useState(0); // Latest stock price
//   const [stockData, setStockData] = useState([]); // Stock price data
//   const [strikes, setStrikes] = useState([]); // Unique strike prices
//   const [putsVolumes, setPutsVolumes] = useState([]); // Puts volume data per strike
//   const [callsVolumes, setCallsVolumes] = useState([]); // Calls volume data per strike
//   const [isDollarMode, setIsDollarMode] = useState(false); // Toggle between volume and dollar amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const polygonApiKey = '_grbZQMP5kasPyiTvmUtApzQ5dapTGSu'; // Replace with your API key

//   // Fetch stock data and options contracts
//   useEffect(() => {
//     const fetchStockDataAndOptions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch stock data for the latest price
//         const stockResponse = await axios.get(
//           `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${stockSymbol}?apiKey=${polygonApiKey}`
//         );
//         const currentPrice = stockResponse.data.ticker.lastTrade.p;
//         setStockPrice(currentPrice);

//         // Fetch stock price data for charting
//         const stockPriceResponse = await axios.get(
//           `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/minute/2024-09-20/${getTodayDate()}?adjusted=true&sort=asc&apiKey=${polygonApiKey}`
//         );
//         setStockData(stockPriceResponse.data.results || []);

//         // Fetch options data dynamically based on stock's current price
//         const strikesResponse = await axios.get(
//           `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${stockSymbol}&apiKey=${polygonApiKey}`
//         );

//         const expirationDate = '2024-09-27'; // Example expiration date
//         const soonestExpiry = strikesResponse.data.results.reduce((prev, curr) => {
//           return new Date(curr.expiration_date) < new Date(prev.expiration_date) ? curr : prev;
//         }, strikesResponse.data.results[0]).expiration_date;

//         const strikesForExpiry = strikesResponse.data.results.filter(
//           contract => contract.expiration_date === soonestExpiry
//         );
//         const allStrikes = strikesForExpiry.map(contract => contract.strike_price);

//         // Find 10 unique strikes closest to the current price (5 above and 5 below)
//         const closestStrikes = [...new Set(allStrikes)]
//           .sort((a, b) => Math.abs(a - currentPrice) - Math.abs(b - currentPrice))
//           .slice(0, 10);

//         // Fetch option volumes for these strikes
//         const volumePromises = closestStrikes.flatMap(strike =>
//           ['call', 'put'].map(async (contractType) => {
//             const response = await axios.get(
//               `https://api.polygon.io/v3/snapshot/options/${stockSymbol}?strike_price=${strike}&expiration_date=${expirationDate}&contract_type=${contractType}&order=asc&limit=10&sort=strike_price&apiKey=${polygonApiKey}`
//             );
//             return response.data.results || [];
//           })
//         );

//         const allVolumes = await Promise.all(volumePromises);

//         const puts = Array(closestStrikes.length).fill(0);  // Initialize volumes with 0
//         const calls = Array(closestStrikes.length).fill(0);

//         allVolumes.forEach(resultList => {
//           resultList.forEach(contract => {
//             const strikeIndex = closestStrikes.indexOf(contract.details.strike_price);
//             if (strikeIndex !== -1) {
//               if (contract.details.contract_type === 'put') {
//                 puts[strikeIndex] = contract.day.volume || 0;
//               } else if (contract.details.contract_type === 'call') {
//                 calls[strikeIndex] = contract.day.volume || 0;
//               }
//             }
//           });
//         });

//         setPutsVolumes(puts);
//         setCallsVolumes(calls);
//         setStrikes(closestStrikes); // Ensure unique strike prices

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDataAndOptions();

//     const interval = setInterval(() => {
//       fetchStockDataAndOptions();
//     }, 60000); // Update every 60 seconds

//     return () => clearInterval(interval);
//   }, [stockSymbol]);

//   // Helper function to get today’s date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   // Line chart data for stock price
//   const stockChartData = {
//     labels: stockData.map((item) => new Date(item.t).toLocaleTimeString()), // X-axis (time)
//     datasets: [
//       {
//         label: 'Stock Price',
//         data: stockData.map((item) => item.c), // Y-axis (stock price)
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };

//   // Bar chart data for puts volume
//   const putsVolumeChartData = {
//     labels: strikes, // X-axis (strike prices)
//     datasets: [
//       {
//         label: isDollarMode ? 'Puts Dollar Amount' : 'Puts Volume',
//         data: putsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Bar chart data for calls volume
//   const callsVolumeChartData = {
//     labels: strikes, // X-axis (strike prices)
//     datasets: [
//       {
//         label: isDollarMode ? 'Calls Dollar Amount' : 'Calls Volume',
//         data: callsVolumes.map((volume) => (isDollarMode ? volume * 100 * stockPrice : volume)),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Stock and Options Tracker</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Stock Symbol:
//           <input
//             type="text"
//             value={stockSymbol}
//             onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//       </div>

//       <button onClick={() => setIsDollarMode(!isDollarMode)}>
//         {isDollarMode ? 'Switch to Volume' : 'Switch to Dollar Amount'}
//       </button>

//       {loading && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div style={{ marginTop: '30px' }}>
//         <h3>Stock Price Data for {stockSymbol}</h3>
//         {stockData.length > 0 ? <Line data={stockChartData} /> : <p>No stock data available</p>}

//         {/* Side-by-Side Layout for Puts and Calls */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
//           <div style={{ width: '48%' }}>
//             <h3>Puts Volume by Strike Price</h3>
//             {putsVolumes.length > 0 ? (
//               <Bar data={putsVolumeChartData} />
//             ) : (
//               <p>No puts volume data available</p>
//             )}
//           </div>
//           <div style={{ width: '48%' }}>
//             <h3>Calls Volume by Strike Price</h3>
//             {callsVolumes.length > 0 ? (
//               <Bar data={callsVolumeChartData} />
//             ) : (
//               <p>No calls volume data available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockOptionsTracker;

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
