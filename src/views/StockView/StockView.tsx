// @/src/views/StockView/StockView.tsx
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import StockInfo from "@/src/components/StockInfo";
import StockRecentReports from "@/src/components/StockRecentReports";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn/card";
import { Badge } from "@/src/components/shadcn/badge";
import NewStockGraph from "@/src/components/ui/charts/newStockGraph";

const StockView = (props: any) => {
  const { companyData, currentStock, loading, error, companiesIds } = props.company;
  
  const latestPrice = currentStock.ohlc[currentStock.ohlc.length - 1].close;
  const previousClose =
    currentStock.ohlc[currentStock.ohlc.length - 2]?.close || latestPrice;
  const change = latestPrice - previousClose;
  const changePercentage = (change / previousClose) * 100;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!companyData || !currentStock) return <div>No data available</div>;

  return (
    <div className="flex flex-1 overflow-hidden w-4/5 h-auto  bg-white">
      {/* <div className="flex flex-1 overflow-hidden"> */}
        <main className="flex-1 p-6 ">
          <NewStockGraph
            currentStock={currentStock}
            setStockTimeInterval={props.setStockTimeInterval}
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
                <p className="text-2xl font-bold">${latestPrice.toFixed(2)}</p>
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
          <StockRecentReports reports={props.reports} />
        </main>
      </div>
    // </div>
  );
};

export default StockView;
