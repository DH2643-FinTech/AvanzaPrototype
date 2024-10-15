import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/shadcn/card";
import { Badge } from "@/src/components/shadcn/badge";
import { FileText } from 'lucide-react';

const RecentStockReports = () => {
    const { companyData } = useAppSelector((state) => state.company);

    if (!companyData) return null;

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Recent Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {companyData.reports && companyData.reports.length > 0 ? (
                        companyData.reports.map((report: any, index: number) => (
                            <Badge key={index} variant="secondary" className="flex items-center w-full justify-start p-2">
                                <FileText className="mr-2 h-4 w-4" />
                                {report.title}
                            </Badge>
                        ))
                    ) : (
                        <p>No recent reports available.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default RecentStockReports;