"use client";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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

export const description = "A line chart with a label";

const chartConfig = {
  equity: {
    label: "equity",
    color: "#cbe2bd",
  },
} satisfies ChartConfig;

export function LineChartEquity({ data }: { data: { date: string; equity: number; }[] }) {
  return (
    <Card className="mt-6 w-3/5">
      <CardHeader>
        <CardTitle>
          Company's historical equity based on reports released
        </CardTitle>
        <CardDescription>
          {data[data.length - 1].date} --- {data[0].date}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[300px] min-h-[300px]"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 12)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="equity"
              type="natural"
              stroke="var(--color-equity)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-equity)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={8}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
