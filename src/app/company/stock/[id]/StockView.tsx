// @/views/StockView/StockView.tsx
// import StockInfo from "@/components/custom/StockInfo";
import {RecentStockReports, StockInfo} from "@/components/custom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import NewStockGraph from "@/components/charts/stockGraph";
import { BarChartRevenue } from "@/components/charts/barChartRevenue";
import { LineChartEquity } from "@/components/charts/lineChartEquity";
import { Skeleton } from "@/components/shadcn/skeleton";
import { StockPresenterProps } from "./stockTypes";
import { FinancialReportsResponse } from "@/lib/model/slices/financialReport/financialReportTypes";

export const StockSkeleton = () =>{
  return (
    
    <div className="w-full my-2">

    <Skeleton className="h-[200px] mb-2 w-full rounded-lg" />
    <Skeleton className="h-[40px] mb-2 w-1/2 rounded-lg" />
    <Skeleton className="h-[40px] mb-8 w-1/3 rounded-lg" />
    <Skeleton className="h-[200px] mb-2 w-full rounded-lg" />
    <Skeleton className="h-[40px] mb-2 w-1/2 rounded-lg" />
    <Skeleton className="h-[40px] mb-2 w-1/3 rounded-lg" />
    </div>
  
  )
}

const StockView = (props: StockPresenterProps) => {
  const { companyData, currentStock, loading, error, companiesIds } =
    props.company;
  const { reports } = props;
  const latestPrice = currentStock?.ohlc[currentStock.ohlc.length - 1].close;
  const previousClose =
    currentStock?.ohlc[currentStock.ohlc.length - 2]?.close || latestPrice;
  const change = (latestPrice ?? 0) - (previousClose ?? latestPrice ?? 0);
  const changePercentage = (change / (previousClose ?? 1)) * 100;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!companyData || !currentStock) return <div>No data available</div>;

  const getRevenueData = () => {
    return reports.reports.data.map((report: FinancialReportsResponse) => ({
      date: new Date(report.eventDate).toISOString().split("T")[0],
      revenue: report.incomeStatement.revenues,
    }));
  };

  const getEquityData = () => {
    return reports.reports.data.map((report: FinancialReportsResponse) => ({
      date: new Date(report.eventDate).toISOString().split("T")[0],
      equity: report.balanceSheet.equity,
    }));
  };

  const renderUpcomingEvents = () => {
    return (
      <div className="my-6">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4 border border-gray-200">
                Date
              </th>
              <th className="text-left py-2 px-4 border border-gray-200">
                Event Type
              </th>
            </tr>
          </thead>
          <tbody>
            {companyData.companyEvents.events.map((event: any, index:number) => (
              <tr key={"upcommingEvent" + index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-200">
                  {event.date}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {event.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-1 overflow-hidden w-4/5 h-auto  bg-white">
      {/* <div className="flex flex-1 overflow-hidden"> */}
      <main className="flex-1 p-6 ">
        <NewStockGraph
          currentStock={currentStock}
          setStockTimeInterval={props.setStockTimeInterval}
          stockGraphProps= {props.stockGraphProps}
          addToWatchlistProps={props.addToWatchlistProps}
        />
        <div className="flex my-6 items-center justify-between">
          {/* <h1 className="text-3xl border border-red-500 font-bold mr-3">{}</h1> */}
          <Badge variant="secondary" className="text-lg py-1">
            {currentStock?.name}
          </Badge>
          <Badge variant="secondary" className="text-lg py-1">
            {currentStock?.id}
          </Badge>
        </div>

        <Card className="mb-6 ">
          <CardHeader>
            <CardTitle>Stock Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-2xl font-bold">${(latestPrice ?? 0).toFixed(2)}</p>
              <p
                className={`${change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)} ({changePercentage.toFixed(2)}%)
              </p>
            </div>
          </CardContent>
        </Card>
        <StockInfo company={props.company} />
        {renderUpcomingEvents()}

        <div className="flex flex-row">
          <div className="w-2/5 py-6 justify-center items-center h-[450px] mt-6 px-6 text-sm">
            <p className="mt-1">
              Revenue refers to the total income generated by a company from its
              business activities, typically from the sale of goods or services.
              It is often referred to as the "top line" figure on an income
              statement and serves as a critical indicator of a company's
              financial performance.
              <br />
              <br />
              Revenue can come from various sources, including product sales,
              service fees, and subscriptions. It is essential for assessing a
              company?s growth potential and operational efficiency. Businesses
              often analyze revenue trends over time to identify patterns,
              seasonality, and market demand. Ultimately, revenue is vital for
              funding operations, paying expenses, and driving profitability.
            </p>
          </div>
          <BarChartRevenue data={getRevenueData()} />
        </div>

        <div className="flex flex-row">
          <LineChartEquity data={getEquityData()} />
          <div className="w-2/5 py-6 justify-center items-center h-[450px] mt-6 px-6 text-sm">
            <p>
              Equity represents the ownership interest in a company, calculated
              as the residual value of assets after deducting liabilities. It
              indicates what shareholders own outright.
              <br />
              <br />
              Key components include common stock, which gives shareholders
              voting rights and potential dividends; preferred stock, which
              offers fixed dividends and priority in liquidation; retained
              earnings, profits reinvested in the business; and additional
              paid-in capital, the amount shareholders pay above the stock's par
              value.
              <br />
              <br />
              Equity is a vital indicator of financial health, reflecting
              stability and enabling companies to fund growth without incurring
              debt, making it crucial for investors assessing a company's
              performance.
            </p>
          </div>
        </div>
        <RecentStockReports reports={props.reports} />
      </main>
    </div>
    // </div>
  );
};

export default StockView;
