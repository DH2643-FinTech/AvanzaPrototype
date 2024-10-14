// @/src/components/StockInfo.tsx
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/shadcn/card"

const StockInfo = () => {
    const { companyData } = useAppSelector((state) => state.company);

    if (!companyData) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{companyData.description || 'No description available.'}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Market Cap</h3>
                        <p>{companyData.marketCapital || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">P/E Ratio</h3>
                        <p>{companyData.priceEarningsRatio || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Dividend Yield</h3>
                        <p>{companyData.directYield ? `${companyData.directYield}%` : 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">52 Week High/Low</h3>
                        <p>{`$${companyData.highestPrice || 'N/A'} - $${companyData.lowestPrice || 'N/A'}`}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default StockInfo