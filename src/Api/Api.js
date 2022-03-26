import axios from "axios";

class Api {
    static getTasks = () => {
        return axios.get("http://localhost:8081/tasks");
    }


    static isAuthenticated = () => {
        return axios.get("http://localhost:8081/users/authenticated", {
            withCredentials: true
        });
    }

    static register = (username, email, password) => {
        return axios.post("http://localhost:8081/users", {
            username: username,
            email: email,
            password: password
        });
    }

    static login = (email, password) => {
        return axios.post("http://localhost:8081/users/sessions", {
            email: email,
            password: password
        });
    }

    static getTaskById = (id) => {
        return axios.post("http://localhost:8081/tasks/description", {
                title: id
            }
        )
    }

    static deleteSession = () => {
        axios.delete("http://localhost:8081/users/sessions").catch((e) => console.log(e))
    }

    static getAllUsers = (author, users, status, due, title, description) => {
        const data = {
            author: author,
            assignees: users.map(user => user.username),
            status: status,
            due: Date.parse(due),
            title: title,
            description: description
        };
        console.log(data);
        return axios.post("http://localhost:8081/tasks", data);
    }

    static changeStatus = (title, status) => {
        return axios.post("http://localhost:8081/tasks/status/change",
            {
                title: title,
                status: status
            })
    }
}

export default Api;
