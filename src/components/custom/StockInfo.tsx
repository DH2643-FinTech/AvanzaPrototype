// @/components/StockInfo.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

const StockInfo = (props: any) => {
  const { companyData } = props.company;
  if (!companyData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          {companyData.company?.description || "No description available."}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Total Number of Shares</h3>
            <p>{companyData.company?.totalNumberOfShares || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold">CEO</h3>
            <p>{companyData.company?.ceo || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Chairman</h3>
            <p>
              {companyData.company?.chairman
                ? `${companyData.company?.chairman}%`
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default StockInfo;
