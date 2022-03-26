import * as React from 'react';
import {useState} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal, TextField} from "@mui/material";
import modalStyle from "../../../styles/ModalStyle";
import Api from "../../../Api/Api";

const RegisterModal = ({open, handleClose}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const registerUser = () => {
        Api.register(username, email, password).then((r) => {
            console.log(r);
        }).catch((e) => {
            console.log(e);
        })
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
                    REGISTRATION FORM
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <Box>
                        <TextField onChange={(e) => setUsername(e.target.value)} id="standard-basic"
                                   label="USERNAME"
                                   variant="standard"/>
                        <TextField onChange={(e) => setEmail(e.target.value)} id="standard-basic" label="EMAIL"
                                   variant="standard" value={email}/>
                        <TextField onChange={(e) => setPassword(e.target.value)} id="standard-basic"
                                   label="PASSWORD" variant="standard" type="password"
                                   value={password}/>
                    </Box>
                    <Button onClick={() => registerUser()}>SUBMIT</Button>
                </Typography>
            </Box>
        </Modal>
    );
}

export default RegisterModal;
