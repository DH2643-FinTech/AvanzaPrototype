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

const StockView = () => {
  const { companyData, currentStock } = useAppSelector(
    (state) => state.company
  );

  if (!companyData || !currentStock) return null;

  const latestPrice = currentStock.ohlc[currentStock.ohlc.length - 1].close;
  const previousClose =
    currentStock.ohlc[currentStock.ohlc.length - 2]?.close || latestPrice;
  const change = latestPrice - previousClose;
  const changePercentage = (change / previousClose) * 100;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
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
          <StockInfo />
          <StockRecentReports />
        </main>
      </div>
    </div>
  );
};

export default StockView;
