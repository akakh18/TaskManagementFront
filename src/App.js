// @ts-ignore
import './App.css';
import RegistrationPage from "./components/users/RegisterPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TasksPage from "./components/tasks/TasksPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/register"} component={RegistrationPage}/>
                <Route exact path={"/main"} component={TasksPage}/>
            </Switch>
        </Router>
    );
}

export default App;
