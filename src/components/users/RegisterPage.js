import * as React from 'react';
import {useEffect, useState} from 'react';
import AuthorisationModal from "./modals/AuthorisationModal";
import {Button} from "@mui/material";
import RegisterModal from "./modals/RegisterModal";
import Api from "../../Api/Api";
import {Redirect} from "react-router-dom";

const RegistrationPage = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const [openAuthorization, setOpenAuthorization] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
            Api.isAuthenticated()
                .then(r => {
                    setAuthenticated(r.data.authenticated);
                    console.log("result: " + r.data.authenticated);
                })
                .catch(e => {
                    console.log(e)
                })
        }, []
    )

    if (authenticated) {
        return <Redirect to="/main"/>;
    }

    const handleOpenRegister = () => {
        setOpenRegister(true)
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
    }


    const handleOpenAuthorization = () => {
        setOpenAuthorization(true)
    };

    const handleCloseAuthorization = () => {
        setOpenAuthorization(false);
    }

    return (
        <div>
            <Button onClick={() => handleOpenRegister()}>Register</Button>
            <Button onClick={() => handleOpenAuthorization()}>Login</Button>
            <RegisterModal open={openRegister} handleClose={handleCloseRegister}/>
            <AuthorisationModal open={openAuthorization} handleClose={handleCloseAuthorization}/>
        </div>
    );
}

export default RegistrationPage;
