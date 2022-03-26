import Box from "@mui/material/Box";
import modalStyle from "../../../../styles/ModalStyle";
import Typography from "@mui/material/Typography";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    Stack,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import StatusSelector from "../status/selectors/StatusSelector";
import DueSelector from "../status/selectors/DueSelector";
import Api from "../../../../Api/Api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const NewTaskModal = ({open, handleClose, onNewTaskSubmit}) => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [usernames, setUsernames] = useState([]);
    const [users, setUsers] = useState([]);
    const [due, setDue] = useState("");

    const handleDateChange = (date) => {
        setDue(date);
    }

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setUsernames(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        axios.get("http://localhost:8081/users")
            .then((r) => {
                setUsers(r.data.users);
            })
    }, [])

    const createNewTask = () => {
        Api.getAllUsers(author, users, status, due, title, description).then(onNewTaskSubmit).catch((e) => {
            console.log(e)
        });
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
                            <TextField onChange={(e) => setAuthor(e.target.value)}
                                       id="standard-basic" label="Author"
                                       variant="standard"/>

                            <StatusSelector onStatusSelect={setStatus}/>

                            <DueSelector onDateChange={handleDateChange}/>

                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-checkbox-label">Assignees</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={usernames}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag"/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.username} value={user.username}>
                                            <Checkbox checked={usernames.indexOf(user.username) > -1}/>
                                            <ListItemText primary={user.username}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                                       id="standard-basic" label="Title" variant="standard"/>
                            <TextField onChange={(e) => {
                                setDescription(e.target.value)
                            }} id="standard-basic" label="Description" variant="standard"/>

                            <Button color="inherit" onClick={createNewTask}>SUBMIT</Button>
                        </Stack>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}

export default NewTaskModal;
