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

  const { companyData, currentStock, loading, error } = props.company;
  const latestPrice = currentStock.ohlc[currentStock.ohlc.length - 1].close;
  const previousClose =
    currentStock.ohlc[currentStock.ohlc.length - 2]?.close || latestPrice;
  const change = latestPrice - previousClose;
  const changePercentage = (change / previousClose) * 100;


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!companyData || !currentStock) return <div>No data available</div>;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
                <NewStockGraph setStockTimeInterval = {props.setStockTimeInterval} />
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold mr-3">{companyData.name}</h1>
            <Badge variant="secondary" className="text-lg py-1">
              {companyData.id}
            </Badge>
          </div>

          <Card className="mb-6">
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
          <StockInfo company = {props.company} />
          <StockRecentReports reports={props.reports} />
        </main>
      </div>
    </div>
  );
};

export default StockView;
