import { StockInfo } from "@/lib/model/slices/company/companyTypes";
import {
  FinancialReportsResponse,
  FinancialReportsState,
} from "@/lib/model/slices/financialReport/financialReportTypes";
import * as d3 from "d3";

export const renderGraph = (
  stockData: StockInfo[] | [],
  report: FinancialReportsState
) => {
  const margin = { top: 70, right: 40, bottom: 50, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  if (!stockData || stockData.length === 0) return;

  const {
    reports: { data: reportData, message },
    loading,
    error,
  } = report;

  if (!loading) {
  }

  const pastEventStockPair = reportData.map((d: FinancialReportsResponse) => {
    const findStock = () => {
      for (let i = 0, j = 1; j < stockData.length; i++, j++) {
        if (
          new Date(stockData[i].timestamp) <= new Date(d.eventDate) &&
          new Date(stockData[j].timestamp) >= new Date(d.eventDate)
        ) {
          return (stockData[i].high + stockData[j].high) / 2;
        }
      }
    };

    const stockValue = findStock();

    const stock: number =
      stockValue !== undefined && !isNaN(stockValue)
        ? parseFloat(stockValue.toFixed(2))
        : 0;

    return {
      event: d.eventDate,
      stock: stock,
      eventDetails: { ...d },
    };
  });

  const data = stockData?.map((d: StockInfo) => ({
    ...d,
    Date: new Date(d.timestamp),
    Open: +d.open,
    Close: +d.close,
    Low: +d.low,
    High: +d.high,
    Volume: +d.totalVolumeTraded,
  }));

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  d3.select("#chart-container").select("svg").remove();

  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = d3.select("body").append("div").attr("class", "tooltip");

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

  const xDomain = d3.extent(data, (d: { Date: Date }) => d.Date) as [
    Date | undefined,
    Date | undefined,
  ];
  if (!xDomain[0] || !xDomain[1]) return;
  x.domain(
    xDomain.filter((d): d is Date => d instanceof Date) || [
      new Date(),
      new Date(),
    ]
  );
  y.domain([
    0,
    ((d3.max(data, (d: { High: number }) => +d.High) ?? 0) + 1) * 1.2,
  ]);

  const timeRange = Math.ceil(
    (xDomain[1].getTime() - xDomain[0].getTime()) / (1000 * 60 * 60 * 24)
  );

  let tickInterval: any;
  let tickFormat: any;

  if (timeRange > 365 * 2) {
    tickInterval = d3.timeYear.every(1);
    tickFormat = d3.timeFormat("%Y");
  } else if (timeRange > 365 / 2) {
    tickInterval = d3.timeMonth.every(1);
    tickFormat = d3.timeFormat("%b %Y");
  } else if (timeRange > 30) {
    tickInterval = d3.timeWeek.every(1);
    tickFormat = d3.timeFormat("%b %d");
  } else {
    tickInterval = d3.timeDay.every(1);
    tickFormat = d3.timeFormat("%b %d");
  }

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .style("font-size", "10px")
    .call(d3.axisBottom(x).ticks(tickInterval).tickFormat(tickFormat))
    .selectAll(".tick line")
    .style("stroke-opacity", 1);

  svg.select(".x-axis").selectAll(".tick text").attr("fill", "#777");

  svg
    .append("g")
    .attr("transform", `translate(${width}, 0)`)
    .call(
      d3.axisRight(y).tickFormat((d) => {
        if (isNaN(+d)) return "";
        return `$${(+d).toFixed(2)}`;
      })
    );

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
    .y0(height)
    .y1((d) => y(d.Close));

  svg
    .append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area)
    .style("fill", "url(#gradient)")
    .style("opacity", 0.5);

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
    .style("fill", "none")
    .style("pointer-events", "all");

  listeningRect.on("mousemove", (event) => {
    const [xCoord] = d3.pointer(event);
    const bisectDate = d3.bisector((d: { Date: Date }) => d.Date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];

    const d = +x0 - +d0?.Date > +d1?.Date - +x0 ? d1 : d0;

    const xPos = x(d.Date);
    const yPos = y(d.Close);

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
      .style("left", `${width + 400}px`)
      .style("top", `${yPos + 200}px`)
      .style("border", `2px solid red`)
      .html(`$${d.Close !== undefined ? d.Close.toFixed(2) : "N/A"}`);

    tooltipRawDate
      .style("display", "block")
      .style("position", "absolute")
      .style("left", `${xPos + 300}px`)
      .style("top", `${height + 230}px`)
      .style("border", `2px solid red`)
      .html(
        `${d.Date !== undefined ? d.Date.toISOString().slice(0, 10) : "N/A"}`
      );

    interface StockEvent {
      event: Date;
      stock: number;
      eventDetails: {
        incomeStatement: {
          revenues: number;
          costOfGoodsSold: number;
          grossProfit: number;
          operatingExpenses: number;
          operatingProfit: number;
          netProfit: number;
        };

        [key: string]: any;
        url: string;
      };
    }

    pastEventStockPair.map((data: StockEvent) => {
      const eventDate = new Date(data.event);
      const xPos = x(eventDate);
      const yPos = y(data.stock);
      const circle = svg
        .append("circle")
        .attr("cx", xPos)
        .attr("cy", yPos)
        .attr("r", 5)
        .attr("fill", "blue")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", 8)
            .attr("fill", "orange");
          d3
            .select("body")
            .append("div")
            .attr("class", "report-tooltip")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .style("position", "absolute")
            .style("background-color", "#f9f9f9")
            .style("border", "1px solid #ccc")
            .style("padding", "12px")
            .style("border-radius", "6px")
            .style("font-size", "13px")
            .style("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)")
            .style("pointer-events", "none")
            .style("width", "280px")
            .style("color", "#333")
            .style("line-height", "1.6").html(`
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px;">
      ${data.eventDetails?.eventTitle || "No Title"}
    </div>
    <div>
      <strong>Date:</strong> ${new Date(data.eventDetails?.eventDate).toLocaleDateString()}<br>
      <strong>Revenue:</strong> $${data.eventDetails?.incomeStatement?.revenues || "N/A"}M<br>
      <strong>Net Profit:</strong> $${data.eventDetails?.incomeStatement?.netProfit || "N/A"}M<br>
      <strong>Assets:</strong> $${data.eventDetails?.balanceSheet?.assets || "N/A"}M<br>
      <strong>Equity:</strong> $${data.eventDetails?.balanceSheet?.equity || "N/A"}M<br>
      <strong>Operating Activities:</strong> $${data.eventDetails?.cashFlow?.operatingActivities || "N/A"}M<br>
    </div>
    <div style="margin-top: 10px;">
        <h1>Click to Download PDF</h1>
    </div>
  `);
        })
        .on("mousemove", function (event) {
          d3.select(".report-tooltip")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseout", function () {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", 5)
            .attr("fill", "blue");
          d3.select(".report-tooltip").remove();
        })
        .on("click", function () {
          const url = data.eventDetails?.url;
          if (url) {
            window.open(url, "_blank");
          }
        });
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
      .style("font-family", "sans-serif");

    svg
      .append("text")
      .attr("class", "Powered by Avanza")
      .attr("x", width - 110)
      .attr("y", height + margin.bottom - 7)
      .style("font-size", "12px")
      .style("font-family", "sans-serif")
      .text("Powered by Avanza");
  });
};
