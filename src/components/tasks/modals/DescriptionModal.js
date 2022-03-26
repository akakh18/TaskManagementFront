import Box from "@mui/material/Box";
import modalStyle from "../../../styles/ModalStyle";
import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import * as React from "react";

const DescriptionModal = ({open, handleClose, description}) => {
    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Description:
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {description}
                </Typography>
            </Box>
        </Modal>
    );
}

export default DescriptionModal;