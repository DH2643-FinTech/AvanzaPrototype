import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn/card";
import { Badge } from "@/src/components/shadcn/badge";
import { FileText } from "lucide-react";

const RecentStockReports = () => {
  const {
    reports: recentReports,
    loading,
    error,
  } = useAppSelector((state) => state.financialReports);

  if (!recentReports) return null;

  //TODO: Implement a way to show the most recent reports - start with endpoints

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Financial Reports</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="space-y-2">
          {recentReports.data && recentReports.data.length > 0 ? (
            recentReports.data.map((report: any, index: number) => (
              <a
                key={index}
                href={report.url} // Link to the report URL
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // Ensures security by preventing access to window.opener
              >
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center w-full justify-start p-2"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {report.eventTitle}
                </Badge>
              </a>
            ))
          ) : (
            <p>No recent reports available.</p>
          )}
        </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Use grid and responsive columns */}
        {recentReports.data && recentReports.data.length > 0 ? (
            recentReports.data.map((report: any, index: number) => (
                <a
                    key={index}
                    href={report.url} // Link to the report URL
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Ensures security by preventing access to window.opener
                >
                    <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center w-full justify-start p-2"
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        {report.eventTitle}
                    </Badge>
                </a>
            ))
        ) : (
            <p>No recent reports available.</p>
        )}
    </div>
      </CardContent>
    </Card>
  );
};

export default RecentStockReports;
