import Box from "@mui/material/Box";
import modalStyle from "../../../../styles/ModalStyle";
import Typography from "@mui/material/Typography";
import {FormControl, InputLabel, MenuItem, Modal, Select, Stack} from "@mui/material";
import StatusSelector from "../status/selectors/StatusSelector";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";

const OVERDUE = "Overdue";
const ON_TIME = "On Time"

const FilterModal = ({open, handleClose, setTasks, setUpdate, update}) => {
    const [status, setStatus] = useState("");
    const [overdue, setOverdue] = useState(true);

    const updateTasksArray = () => {
        // axios.post("http://localhost:8081/tasks/filter",
        //     {
        //         status: status,
        //         overdue: overdue === "overdue"
        //     }).then(r => {
        //     setTasks(r.data);
        // })
        //     .catch((e) => console.log(e));
        // setUpdate(!update);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    CREATE NEW TASK
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <Box>
                        <Stack spacing={3}>

                            <StatusSelector onStatusSelect={setStatus}/>

                            id="standard-basic" label="Title" variant="standard"/>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Status"
                                    value="Overdue"
                                    onChange={(e) => {
                                        setOverdue(e.target.value);
                                    }}
                                >
                                    <MenuItem value={OVERDUE}>{OVERDUE}</MenuItem>
                                    <MenuItem value={ON_TIME}>{ON_TIME}</MenuItem>

                                </Select>
                            </FormControl>

                            <Button color="inherit" onClick={updateTasksArray}>SUBMIT</Button>
                        </Stack>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    );
}

export default FilterModal;