"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/src/lib/utils/utils";
import { Button } from "@/src/components/shadcn/button";
import { Calendar } from "@/src/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/shadcn/popover";
import { Label } from "../shadcn/label";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { fetchCompanyDetails } from "@/src/lib/features/company/companyAPI";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { useState } from "react";

export const DatePickerComp = (props: any) => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const dispatch = useAppDispatch();
  const currentStock = useAppSelector((state) => state.company.currentStock);
  const handleFetch = () =>{
    if (currentStock) {
      dispatch(fetchCompanyDetails({
        id: currentStock.id, fromDate: from, toDate: to, defaultTimePeriod: false,
        name: currentStock.name
      }));
    }
  }

  const DatePicker = (dProp: any) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[220px] justify-start text-left font-normal",
              !dProp.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dProp.date ? format(dProp.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dProp.date}
            onSelect={(date: Date | undefined) => {
              if (date) {
                dProp.setLocal(date);
                dProp.setDate(date);
                //dProp.onClose(); // Close dropdown after selecting a date
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };

  const DatePickerPair = (props: any) => (
    <div className="flex w-[240px] flex-col justify-between h-[100px]">
      <div className="flex flex-row justify-center items-center">
        <Label className="w-12">From</Label>
        <DatePicker date={props.startDate} setLocal={setFrom} setDate={props.setStartDate} />
      </div>
      <div>
      <div className="flex flex-row justify-center items-center">
      <Label className="w-12">To</Label>
        <DatePicker date={props.endDate} setLocal={setTo} setDate={props.setEndDate} />
      </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <Popover>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent className="relative top-[20px] left-[60px]">
          <div className="relative">
            <div className="p-4">
              <DatePickerPair
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                endDate={props.endDate}
                setEndDate={props.setEndDate}
              />
              <div className="flex justify-center w-full">

              <Button onClick={handleFetch} className="relative top-4 h-8 ">Save</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
