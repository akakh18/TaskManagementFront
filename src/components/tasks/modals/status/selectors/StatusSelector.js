import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import statuses from "../../../TaskStatuses";
import * as React from "react";
import {useState} from "react";

const StatusSelector = ({onStatusSelect}) => {
    const [status, setStatus] = useState("");

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                value={status}
                onChange={(e) => {
                    setStatus(e.target.value);
                    onStatusSelect(e.target.value);
                }}
            >
                {statuses.map((status) => (
                    <MenuItem value={status}>{status}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default StatusSelector;