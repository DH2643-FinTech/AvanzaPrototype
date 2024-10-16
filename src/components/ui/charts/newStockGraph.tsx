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

const NewStockGraph = (props: any) => {

  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);
  const pastEvent = useAppSelector((state) => state.company.companyData?.dividends?.pastEvents);
  // const [resolution, setResolution] = React.useState("Day");
  // const [selectedValue, setSelectedValue] = React.useState("");

  useEffect(() => {
    return renderGraph(stockData, pastEvent || []);
  }, [stockData]);


  const handleSelectChange = (value: any) => {
    // setSelectedValue(value);
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1500px] border relative left-[40px] w-[1300px] h-[900px]  shadow-md">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] h-[40px] left-12 top-24 relative">
              <SelectValue placeholder="day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[1440] h-[800px]" id="chart-container"></div>
          <div className="relative justify-start items-center flex left-12 bottom-2 h-[60px] w-[1400px]">
            <DatePickerComp setStockTimeInterval={props.setStockTimeInterval} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStockGraph;
