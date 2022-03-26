import Box from "@mui/material/Box";
import modalStyle from "../../../../styles/ModalStyle";
import Typography from "@mui/material/Typography";
import {FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import statuses from "../../TaskStatuses";
import Api from "../../../../Api/Api";

const ChangeStatusModal = ({open, handleClose, onChangeTaskSubmit}) => {
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("");
    const taskStatuses = statuses;

    const changeStatus = () => {
        Api.changeStatus(title, status)
            .catch(e => console.log(e));
        onChangeTaskSubmit();
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
                    CHANGE STATUS
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <Box>
                        <Stack spacing={3}>
                            <TextField onChange={(e) => {
                                setTitle(e.target.value)
                            }} id="standard-basic" label="Title" variant="standard"/>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    {taskStatuses.map((status) => (
                                        <MenuItem value={status}>{status}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>
                    <Button color="inherit" onClick={changeStatus}>SUBMIT</Button>
                </Typography>
            </Box>
        </Modal>
    )
}

export default ChangeStatusModal;
