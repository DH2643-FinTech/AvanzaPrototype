import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import { FileText } from "lucide-react";

const RecentStockReports = (props: any) => {

  const { reports: recentReports} = props.reports;
  if (!recentReports) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Financial Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {" "}
          {recentReports.data && recentReports.data.length > 0 ? (
            recentReports.data.map((report: any, index: number) => (
              <a
                key={index}
                href={report.url} 
                target="_blank" 
                rel="noopener noreferrer" 
              >
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center justify-start p-2"
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
