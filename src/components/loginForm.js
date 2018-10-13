import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {toast} from "react-toastify";
import auth from "../services/authService";

class LoginForm extends Form {
    state = {
        data: {username: "", password: ""},
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    doSubmit = async () => {
        const {username, password} = this.state.data;
        try {
            await auth.login(username, password);
            window.location = "/";
        }
        catch
            (e) {
            if (e && e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});
                toast.error(e.response.data);
            }

        }
    }
    ;

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;