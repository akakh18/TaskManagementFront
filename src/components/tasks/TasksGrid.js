import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {useState} from "react";
import Api from "../../Api/Api";
import DescriptionModal from "./modals/DescriptionModal";

const TasksGrid = ({tasks}) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("Initial");

    const handleDescription = (taskId) => {
        setOpen(true);
        Api.getTaskById(taskId)
            .then((r) => {
                console.log(r.data.description);
                setDescription(r.data.description);
            })
            .catch((e) => console.log(e))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = ["Title", "Author", "Status", "Due", "Assignees", "Description"];

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            {columns.map(column => (
                                <TableCell align="right">{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.author}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.due}</TableCell>
                                <TableCell align="right">{row.assignees.toString()}</TableCell>
                                <TableCell align="right"><Button onClick={() => handleDescription(parseInt(row.id))}>View
                                    Task</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DescriptionModal open={open} handleClose={handleClose} description={description}/>
        </div>
    );
}

export default TasksGrid;
