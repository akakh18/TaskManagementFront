import * as React from "react";
import {useEffect, useState} from "react";
import NewTaskModal from "./modals/new_task/NewTaskModal";
import {Button} from "@mui/material";
import {Redirect} from "react-router-dom";
import ChangeStatusModal from "./modals/status/ChangeStatusModal";
import TasksGrid from "./TasksGrid";
import Api from "../../Api/Api";

const TasksPage = () => {
    const refreshTasks = () => {
        Api.getTasks()
            .then(res => {
                setTasks(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
    const [openChangeStateModal, setOpenChangeStateModal] = useState(false);
    const [authenticated, setAuthenticated] = useState(true);
    const [tasks, setTasks] = useState([])

    Api.isAuthenticated()
        .then(r => {
            setAuthenticated(authenticated);
            console.log(r.data);
        })
        .catch(e => {
            console.log(e)
        })

    useEffect(() => {
            refreshTasks();
        }, []
    );

    if (!authenticated) {
        return <Redirect to={"/register"}/>;
    }

    console.log(authenticated);

    const handleOpenNewTask = () => {
        setOpenNewTaskModal(true)
    };

    const handleCloseNewTask = () => {
        setOpenNewTaskModal(false);
    }

    const handleOpenChangeStatus = () => {
        setOpenChangeStateModal(true)
    };

    const handleCloseChangeTask = () => {
        setOpenChangeStateModal(false);
    }

    const handleSubmit = () => {
        refreshTasks();
    }

    const deleteSession = () => {
        Api.deleteSession(Api.deleteSession());
    }

    return (
        <div>
            <Button color="primary" size="medium" onClick={handleOpenNewTask}>New Task</Button>
            <Button color="primary" size="medium" onClick={handleOpenChangeStatus}>Change Status</Button>
            <Button size="medium" onClick={deleteSession}>Log out</Button>
            <NewTaskModal open={openNewTaskModal} handleClose={handleCloseNewTask}
                          onNewTaskSubmit={handleSubmit}/>
            <ChangeStatusModal open={openChangeStateModal} handleClose={handleCloseChangeTask}
                               onChangeTaskSubmit={handleSubmit}/>
            <TasksGrid tasks={tasks}/>
        </div>
    )
}

export default TasksPage
