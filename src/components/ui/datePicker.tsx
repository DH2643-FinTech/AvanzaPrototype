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

export const DatePickerComp = (props: any) => {
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
      <div>
        <DatePicker date={props.startDate} setDate={props.setStartDate} />
      </div>
      <div>
        <DatePicker date={props.endDate} setDate={props.setEndDate} />
      </div>
    </div>
  );

  return (
    <div className="ml-[80px] mt-2">
      <Popover>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent className="ml-[50px]">
          <div className="relative">
            <div className="p-4">
              <DatePickerPair
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                endDate={props.endDate}
                setEndDate={props.setEndDate}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
