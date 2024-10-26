"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "#cbe2bd",
  },
} satisfies ChartConfig;

export function BarChartRevenue(props: any) {
  const { data } = props;
  return (
    <Card className="mt-6 w-3/5">
      <CardHeader>
        <CardTitle>
          Company's historical revenue based on reports released
        </CardTitle>
        <CardDescription>
          {data[data.length - 1].date} --- {data[0].date}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-[300px] h-[300px]"
          config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 12)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={8}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm"> */}
      {/* </CardFooter> */}
    </Card>
  );
}