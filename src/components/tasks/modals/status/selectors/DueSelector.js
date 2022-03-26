import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/lab";
import * as React from "react";
import {useState} from "react";

const DueSelector = ({onDateChange}) => {
    const [due, setDue] = useState("");

    const handleDateChange = (date) => {
        setDue(date)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label="Due"
                inputFormat="MM/dd/yyyy"
                value={due}
                onChange={(date) => {
                    setDue(date);
                    onDateChange(date);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default DueSelector;