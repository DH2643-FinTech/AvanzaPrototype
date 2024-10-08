import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {useState} from "react"

export default function DatePickerComp(props: any) {

    const [value, setValue] = useState("");

    const handleStartDateChange = (e: any) => {
        // setValue(e.target.value);
        props.setStartDate(e.$d);
        console.log(e.$d);

    }

    const handleEndDateChange = (e: any) => {
        // setValue(e.target.value);
        props.setEndDate(e.$d);
        console.log(e.$d);
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={handleStartDateChange} slotProps={{textField: {size: 'small', sx:{width:130, marginRight: 0.4}},}}/>
          <DatePicker onChange={handleEndDateChange} slotProps={{textField: {size: 'small', sx:{width:130}},}} maxDate={dayjs(new Date())} />
    </LocalizationProvider>
  );
}
