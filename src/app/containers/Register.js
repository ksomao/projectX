import React from 'react'
import Parse from "parse";
import {Link, Redirect} from "react-router-dom";
require("../lib/parseInit")



class Register extends React.Component {

    state = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    async AddUser() {
        var user = new Parse.User();
        user.set("username", this.state.email);
        user.set("password", this.state.password);
        user.set("email", this.state.email);
        try {
            await user.signUp();
            alert("success")
        } catch (error) {
            alert("Nous n'avons pas pu vous enregistrer, veuillez réesayer");
        }
    }

    render() {
        /*   if (localStorage.getItem('userData')) {
               this.setUserInfos();
               return <Redirect to={{pathname: "/inspections"}}/>
           }*/
        return (
            <div>
                <div
                    style={{
                        backgroundColor: 'white',
                        width: '40%',
                        padding: '32px',
                        margin: '100px auto 0px',
                        justifyContent: 'center',
                        maxWidth: '400px',
                        minWidth: '280px',
                        borderRadius: '5px'
                    }}>
                    <div>
                        <h1 className={"mb-4"}>Créer un compte</h1>
                    </div>
                    <form>
                        <div>
                            <h4 className={"text-muted"}>Email</h4>
                            <input type="email"
                                   placeholder=""
                                   className={"form-control mb-2"}
                                   value={this.state.email}
                                   onChange={ev => this.setState({email: ev.target.value})}
                                   required
                            />

                        </div>
                        <div>
                            <h4 className={"text-muted"}>Password</h4>
                            <input type="password"
                                   className={"form-control mb-4"}
                                   value={this.state.password}
                                   onChange={ev => this.setState({password: ev.target.value})}
                                   required
                            />
                        </div>
                        <div>
                            <h4 className={"text-muted"}>Confirmation mot de passe</h4>
                            <input type="password"
                                   className={"form-control mb-4"}
                                   value={this.state.confirmPassword}
                                   onChange={ev => this.setState({confirmPassword: ev.target.value})}
                                   required
                            />
                        </div>
                    </form>
                    <Link className={"btn btn-light col-6"} to={{pathname: "/login"}}>Se Connecter</Link>
                    <button
                        className={"btn btn-dark"}
                        onClick={() => this.AddUser()}>Créer mon compte
                    </button>
                </div>
            </div>
        )
    }
}

export default Register