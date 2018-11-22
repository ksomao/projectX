import React from 'react'
import Parse from "parse";
import {Link, Redirect} from "react-router-dom";

require("../lib/parseInit")

class Login extends React.Component {

    state = {
        email: "",
        password: "",
    };


    async logIn() {
        try {
            const user = await Parse.User.logIn(this.state.email, this.state.password);
            this.props.history.push('Home')
        }
        catch (e) {
            alert("mauvais email ou mot de passe")
        }
    }

    componentDidMount() {

        if (navigator.geolocation) {
            console.log("ok")
        } else {
            alert("Geo Location not supported by browser");
        }

        var currentUser = Parse.User.current();
        if (currentUser) this.props.history.push('/Home')

        if (this.props.email) {
            this.setState({email: this.props.email})
        }
    }

    render() {

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
                    </form>
                    <button
                        className={"btn btn-dark col-12 mb-2"}
                        onClick={() => this.logIn()}>Se connecter
                    </button>
                    <Link className={"btn btn-light col-12"} to={{pathname: "/register"}}>Créer mon compte</Link>
                </div>
            </div>
        )
    }
}

export default Login