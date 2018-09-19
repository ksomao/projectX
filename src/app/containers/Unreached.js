import React from 'react'
import ParseInit from '../lib/parseInit'
import {Link, Redirect} from "react-router-dom";
import Parse from "parse";


class Unreached extends React.Component {

    state = {
        email: "",
        password: "",
        confirmPassword: "",
        results:""
    };

    componentDidMount() {
        var query = new Parse.Query('Adresse');
        query.equalTo("status", "false")
        query.find().then((results) => {
            if (results) {
                this.setState({results})
            }
            else alert("toute les addresses on été visitées")
        }, function (error) {
            console.log("err", error);
        });
    }

    render() {

        return (
            <div>

            </div>
        )
    }
}

export default Unreached