import React, { useEffect } from "react";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import * as d3 from "d3";

const StockGraph = () => {
  const margin = { top: 70, right: 60, bottom: 50, left: 80 };
  const width = 1600 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Access the stock data from Redux store
  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);

  useEffect(() => {
    if (!stockData || stockData.length === 0) return; // Ensure data is available before rendering the graph

    // Parse the timestamp to create Date objects and ensure other fields are numeric
    //const parseDate = d3.timeParse("%s"); // Parse timestamp in seconds

    const data = stockData.map((d) => ({
      ...d,
      Date: new Date(d.timestamp), // Convert timestamp to JS Date
      Open: +d.open,
      Close: +d.close,
      Low: +d.low,
      High: +d.high,
      Volume: +d.totalVolumeTraded,
    }));
    console.log(data);

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

    // Create tooltip div
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    // Create a second tooltip div for raw date
    const tooltipRawDate = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip");

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#85bb65")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#85bb65")
      .attr("stop-opacity", 0);

    // Set the domain for x (time) and y (price) scales
    const xDomain = d3.extent(data, (d) => d.Date) as [Date, Date];
    x.domain(xDomain || [new Date(), new Date()]);
    y.domain([0, ((d3.max(data, (d) => d.High) ?? 0) + 1) * 2]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .style("font-size", "10px")
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeDay.every(1))
          .tickFormat((domainValue, index) =>
            d3.timeFormat("%b %d")(domainValue as Date)
          )
      )
      .selectAll(".tick line")
      .style("stroke-opacity", 1);

    svg.select(".x-axis").selectAll(".tick text").attr("fill", "#777");

    // Add the y-axis with custom tick formatting

    svg
      .append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(
        d3.axisRight(y).tickFormat((d) => {
          if (isNaN(+d)) return "";
          return `$${(+d).toFixed(2)}`;
        })
      );

    // Line generator for the close price
    const line = d3
      .line<{
        Date: Date;
        Open: number;
        Close: number;
        Low: number;
        High: number;
        Volume: number;
        timestamp: string;
        open: number;
        close: number;
        low: number;
        high: number;
        totalVolumeTraded: number;
      }>()
      .x((d) => x(d.Date))
      .y((d) => y(d.Close));

    // Area generator for the open-close price range
    const area = d3
      .area<{
        Date: Date;
        Open: number;
        Close: number;
        Low: number;
        High: number;
        Volume: number;
        timestamp: string;
        open: number;
        close: number;
        low: number;
        high: number;
        totalVolumeTraded: number;
      }>()
      .x((d) => x(d.Date))
      .y0(height) // Start from the open price
      .y1((d) => y(d.Close)); // End at the close price

    // Append the area path
    svg
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "url(#gradient)")
      .style("opacity", 0.5);

    // Append the line path
    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#85bb65")
      .attr("stroke-width", 1)
      .attr("d", line);

    const circle = svg
      .append("circle")
      .attr("r", 0)
      .attr("fill", "red")
      .style("stroke", "white")
      .attr("opacity", 0.7)
      .style("pointer-events", "none");

    const tooltipLineX = svg
      .append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-x")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const tooltipLineY = svg
      .append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-y")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const listeningRect = svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none") // Make it transparent but responsive to events
      .style("pointer-events", "all");

    listeningRect.on("mousemove", (event) => {
      const [xCoord] = d3.pointer(event); // Arrow functions don't have their own 'this', use event only
      console.log(xCoord);
      const bisectDate = d3.bisector((d: { Date: Date }) => d.Date).left;
      const x0 = x.invert(xCoord); // Get the date corresponding to the x-coordinate
      const i = bisectDate(data, x0, 1); // Find the index of the closest date
      const d0 = data[i - 1];
      const d1 = data[i];

      // Choose the closest date between d0 and d1
      const d = +x0 - +d0.Date > +d1.Date - +x0 ? d1 : d0;

      const xPos = x(d.Date); // X position based on the date
      const yPos = y(d.Close); // Y position based on the 'Close' value

      console.log(xPos, yPos);
      circle.attr("cx", xPos).attr("cy", yPos);

      circle.transition().duration(50).attr("r", 5);

      tooltipLineX
        .style("display", "block")
        .attr("x1", xPos)
        .attr("x2", xPos)
        .attr("y1", 0)
        .attr("y2", height);
      tooltipLineY
        .style("display", "block")
        .attr("y1", yPos)
        .attr("y2", yPos)
        .attr("x1", 0)
        .attr("x2", width);

      tooltip
        .style("display", "block")
        .style("position", "absolute")
        .style("left", `${width + 130}px`)
        .style("top", `${yPos + 68}px`)
        .style("border", `2px solid red`)
        .html(`$${d.Close !== undefined ? d.Close.toFixed(2) : "N/A"}`);

      tooltipRawDate
        .style("display", "block")
        .style("position", "absolute")
        .style("left", `${xPos + 60}px`)
        .style("top", `${height + 53}px`)
        .style("border", `2px solid red`)
        .html(
          `${d.Date !== undefined ? d.Date.toISOString().slice(0, 10) : "N/A"}`
        );
    });

    listeningRect.on("mouseleave", () => {
      circle.transition().duration(50).attr("r", 0);
      tooltipLineX.style("display", "none");
      tooltipLineY.style("display", "none");
      tooltipLineX.attr("x1", 0).attr("x2", 0);
      tooltipLineY.attr("y1", 0).attr("y2", 0);
      tooltip.style("display", "none");
      tooltipRawDate.style("display", "none");
    });

    svg
      .append("text")
      .attr("class", "char-title")
      .attr("x", margin.left - 115)
      .attr("y", margin.top - 100)
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .text("Stock share of a Company X");

    svg
      .append("text")
      .attr("class", "Powered by Avanza")
      .attr("x", width - 110)
      .attr("y", height + margin.bottom - 7)
      .style("font-size", "12px")
      .style("font-family", "sans-serif")
      .text("Powered by Avanza");
  }, [stockData]); // The effect depends on stockData, so it runs whenever stockData updates

  return <div id="chart-container"></div>;
};

export default StockGraph;
