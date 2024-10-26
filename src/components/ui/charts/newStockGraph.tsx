import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/model/store";
import { DatePickerComp } from "../datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select";
import { renderGraph } from "./d3Graph";
import AddToFavoritesButton from "../../AddToFavoritesButton";
import { useSession } from "next-auth/react";
const NewStockGraph = (props: any) => {
  const { data: session, status } = useSession();
  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);
  const reports = useAppSelector((state) => state.financialReports);

  useEffect(() => {
    return renderGraph(stockData, reports || []);
  }, [stockData]);

  const handleSelectChange = (value: any) => {
    // setSelectedValue(value);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-[1500px]  relative  w-[1080px] h-[700px]  shadow-md">
          <div className="flex flex-row">

          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] h-[40px]  left-12 top-10 relative">
              <SelectValue placeholder="day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative justify-start items-center  top-10 flex left-8 px-10 bottom-2 h-[40px] w-[400px]">
            <div className="relative">
              <DatePickerComp
                setStockTimeInterval={props.setStockTimeInterval}
                />
            </div>
            {
              status === "authenticated" && (
                <div className="left-4 relative">
              <AddToFavoritesButton stockId={props.currentStock.id} />
            </div>)
            }
                </div>
          </div>
          <div className=" h-[600px]" id="chart-container"></div>

        </div>
      </div>
    </div>
  );
};

export default NewStockGraph;
