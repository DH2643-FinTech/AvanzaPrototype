// @/src/components/StockInfo.tsx
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn/card";

const StockInfo = () => {
  const { companyData } = useAppSelector((state) => state.company);
  console.log("StockInfo");
  console.log(companyData);

  if (!companyData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          {companyData.company.description || "No description available."}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Total Number of Shares</h3>
            <p>{companyData.company.totalNumberOfShares || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold">CEO</h3>
            <p>{companyData.company.ceo || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Chairman</h3>
            <p>
              {companyData.company.chairman
                ? `${companyData.company.chairman}%`
                : "N/A"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">homapage</h3>
            <p>
              <a
                href={companyData.company?.homepage || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {companyData.company?.homepage || "N/A"}
              </a>
            </p>

            {/* <p>{`$${companyData.company || 'N/A'} - $${companyData.company.homepage || 'N/A'}`}</p> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default StockInfo;
