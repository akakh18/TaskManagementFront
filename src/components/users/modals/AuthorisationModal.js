import * as React from 'react';
import {useState} from 'react';
import {Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import modalStyle from "../../../styles/ModalStyle";
import Api from "../../../Api/Api";

const AuthorisationModal = ({open, handleClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Api.login(email, password).catch((e) => console.log(e))
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
                        <TextField onChange={(e) => setEmail(e.target.value)} id="standard-basic" label="EMAIL"
                                   variant="standard"/>
                        <TextField onChange={(e) => setPassword(e.target.value)} id="standard-basic" label="PASSWORD"
                                   variant="standard"
                                   type="password"/>
                    </Box>
                    <Button onClick={login}>SUBMIT</Button>
                </Typography>
            </Box>
        </Modal>
    );
}

export default AuthorisationModal;
