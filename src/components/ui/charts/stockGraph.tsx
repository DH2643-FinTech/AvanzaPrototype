// import d3 from "d3";
// const StockGraph = () => {
//   const margin = { top: 70, right: 60, bottom: 50, left: 80 };
//   const width = 1600 - margin.left - margin.right;
//   const height = 800 - margin.top - margin.bottom;

//   // x and y scales
//   const x = d3.scaleTime().range([0, width]);
//   const y = d3.scaleLinear().range([height, 0]);

//   // creating the SVG element and append it to the chart container div
//   const svg = d3
//     .select("#chart-container")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   d3.csv("NTDOY.csv").then((data) => {
//     const parseDate = d3.timeParse("%Y-%m-%d");
//     data.forEach((d) => {
//       d.Date = parseDate(d.Date);
//       d.Close = +d.Close;
//     });

//     // domain for the x and y scales

//     x.domain(d3.extent(data, (d) => d.Date));
//     y.domain([0, d3.max(data, (d) => d.Close)]);

//     // add the x-axis

//     svg
//       .append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x));

//     // add the y-axis

//     svg
//       .append("g")
//       .attr("transform", `translate(${width}, 0)`)
//       .call(
//         d3.axisRight(y).tickFormat((d) => {
//           if (isNaN(+d)) return "";
//           return `$${(+d).toFixed(2)}`;
//         })
//       );

//     // line generator
//     const line = d3
//       .line()
//       .x((d) => x(d.Date))
//       .y((d) => y(d.Close));

//     const area = d3
//       .area()
//       .x((d) => x(d.Date))
//       .y0(height)
//       .y1((d) => y(d.Close));

//     svg
//       .append("path")
//       .datum(data)
//       .attr("class", "area")
//       .attr("d", area)
//       .style("fill", "#85bb65")
//       .style("opacity", 0.5);

//     svg
//       .append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("fill", "none")
//       .attr("stroke", "#85bb65")
//       .attr("stroke-width", 1)
//       .attr("d", line);
//   });
//   return <div id="chart-container"></div>;
// };

// export default StockGraph;

// import React, { useEffect } from 'react';
// import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
// import * as d3 from 'd3';

// const StockGraph = () => {
//   const margin = { top: 70, right: 60, bottom: 50, left: 80 };
//   const width = 1600 - margin.left - margin.right;
//   const height = 800 - margin.top - margin.bottom;

//   // Access the stock data from the Redux store
//   const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);

//   useEffect(() => {
//     if (!stockData || stockData.length === 0) return; // Ensure data is available before rendering the graph

//     // Parse the date and close price from Redux stock data
//     const parseDate = d3.timeParse("%Y-%m-%d");
//     const data = stockData.map(d => ({
//       ...d,
//       Date: parseDate(d.Date),
//       close: +d.close
//     }));

//     // x and y scales
//     const x = d3.scaleTime().range([0, width]);
//     const y = d3.scaleLinear().range([height, 0]);

//     // Clear any existing chart to prevent duplication
//     d3.select("#chart-container").select("svg").remove();

//     // Create the SVG element and append it to the chart container div
//     const svg = d3
//       .select("#chart-container")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     // Set the domain for x and y scales
//     x.domain(d3.extent(data, d => d.Date));
//     y.domain([0, d3.max(data, d => d.Close)]);

//     // Add the x-axis
//     svg.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x));

//     // Add the y-axis with custom tick formatting
//     svg.append("g")
//       .attr("transform", `translate(${width}, 0)`)
//       .call(d3.axisRight(y).tickFormat(d => {
//         if (isNaN(+d)) return "";
//         return `$${(+d).toFixed(2)}`;
//       }));

//     // Line generator
//     const line = d3.line()
//       .x(d => x(d.Date))
//       .y(d => y(d.Close));

//     // Area generator
//     const area = d3.area()
//       .x(d => x(d.Date))
//       .y0(height)
//       .y1(d => y(d.Close));

//     // Append the area path
//     svg.append("path")
//       .datum(data)
//       .attr("class", "area")
//       .attr("d", area)
//       .style("fill", "#85bb65")
//       .style("opacity", 0.5);

//     // Append the line path
//     svg.append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("fill", "none")
//       .attr("stroke", "#85bb65")
//       .attr("stroke-width", 1)
//       .attr("d", line);
//   }, [stockData]); // The effect depends on stockData, so it runs whenever stockData updates

//   return <div id="chart-container"></div>;
// };

// export default StockGraph;


import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import * as d3 from 'd3';

const StockGraph = () => {
  const margin = { top: 70, right: 60, bottom: 50, left: 80 };
  const width = 1600 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Access the stock data from Redux store
  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);

  useEffect(() => {
    if (!stockData || stockData.length === 0) return; // Ensure data is available before rendering the graph

    // Parse the timestamp to create Date objects and ensure other fields are numeric
    const parseDate = d3.timeParse("%s"); // Parse timestamp in seconds

    const data = stockData.map(d => ({
      ...d,
      Date: new Date(d.timestamp), // Convert timestamp to JS Date
      Open: +d.open,
      Close: +d.close,
      Low: +d.low,
      High: +d.high,
      Volume: +d.totalVolumeTraded,
    }));

    // x and y scales
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Clear any existing chart to prevent duplication
    d3.select("#chart-container").select("svg").remove();

    // Create the SVG element and append it to the chart container div
    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set the domain for x (time) and y (price) scales
    const xDomain = d3.extent(data, d => d.Date) as [Date, Date];
    x.domain(xDomain || [new Date(), new Date()]);
    y.domain([
      0, 
      ((d3.max(data, d => d.High) ?? 0 ) +1) *2
    ]);

    // Add the x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add the y-axis with custom tick formatting
    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d => {
        if (isNaN(+d)) return "";
        return `$${(+d).toFixed(2)}`;
      }));

    // Line generator for the close price
    const line = d3.line<{ Date: Date; Open: number; Close: number; Low: number; High: number; Volume: number; timestamp: string; open: number; close: number; low: number; high: number; totalVolumeTraded: number; }>()
      .x((d) => x(d.Date))
      .y((d) => y(d.Close));

    // Area generator for the open-close price range
    const area = d3.area<{ Date: Date; Open: number; Close: number; Low: number; High: number; Volume: number; timestamp: string; open: number; close: number; low: number; high: number; totalVolumeTraded: number; }>()
      .x((d) => x(d.Date))
      .y0(height)  // Start from the open price
      .y1((d) => y(d.Close)); // End at the close price

    // Append the area path
    svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "#85bb65")
      .style("opacity", 0.5);

    // Append the line path
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#85bb65")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Candlestick-style rectangles (optional, for open-high-low-close)
    // svg.selectAll(".candlestick")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", d => x(d.Date) - 5) // Position the rectangle slightly left
    //   .attr("y", d => y(Math.max(d.Open, d.Close))) // Draw from the higher value
    //   .attr("width", 10) // Width of the candlestick
    //   .attr("height", d => Math.abs(y(d.Open) - y(d.Close))) // Height between open and close
    //   .attr("fill", d => d.Close > d.Open ? "#4caf50" : "#f44336") // Color based on whether the price increased or decreased

  }, [stockData]); // The effect depends on stockData, so it runs whenever stockData updates

  return <div id="chart-container"></div>;
};

export default StockGraph;
