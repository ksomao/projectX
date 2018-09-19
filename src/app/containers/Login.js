import React from 'react'
import {Link, Redirect} from "react-router-dom";


class Login extends React.Component {

    state = {
        email: "",
        password: "",
    };

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
                        <h1 className={"mb-4"}>Login</h1>
                    </div>
                    <form>
                        <div>
                            <h4 className={"text-muted"}>Email</h4>
                            <input type="email"
                                   placeholder="Enter a valid email address"
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
                    </form>
                    <Link className={"btn btn-light col-6"} to={{pathname: "/register"}}>Register</Link>
                    <button
                        className={"btn btn-dark col-6"}
                        onClick={() => this.props.signInUser({
                            email: this.state.email,
                            password: this.state.password
                        })}>Se connecter
                    </button>
                </div>
            </div>
        )
    }
}

export default Login