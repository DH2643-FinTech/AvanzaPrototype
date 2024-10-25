import React, { useEffect } from "react";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { DatePickerComp } from "../datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select";
import { renderGraph } from "./graph";
import AddToFavoritesButton from "../../AddToFavoritesButton";

const NewStockGraph = (props: any) => {
  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);
  const reports = useAppSelector((state) => state.financialReports);

  useEffect(() => {
    return renderGraph(stockData, reports || []);
  }, [stockData]);

  const handleSelectChange = (value: any) => {
   
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-full border w-full lg:max-w-[1200px] h-auto shadow-md">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px] h-[40px] mb-4">
            <SelectValue placeholder="day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full h-[500px] sm:h-[600px] lg:h-[800px]" id="chart-container"></div>

        <div className="flex justify-between items-center mt-4 w-full">
          <div>
            <DatePickerComp setStockTimeInterval={props.setStockTimeInterval} />
          </div>
          <div>
            <AddToFavoritesButton stockId={props.currentStock.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStockGraph;
