import React from 'react'
import ParseInit from '../lib/parseInit'
import {Link, Redirect} from "react-router-dom";
import Parse from "parse";

const swalConfig = {
    title: 'Confirmer',
    text: "Je confirme avoir pû discuter avec quelqu'un à cette adresse",
    type: 'info',
    showCloseButton: true,
    confirmButtonColor: '#108718',
    confirmButtonText: 'oui',
    allowOutsideClick: false
}

class Unreached extends React.Component {

    state = {
        email: "",
        password: "",
        confirmPassword: "",
        results: ""
    };

    componentDidMount() {
        this.getAddressList()
    }


    getAddressList() {
        var query = new Parse.Query('Adresse');
        query.equalTo("status", "false")
        query.find().then((results) => {
            if (results) {
                console.log(results);
                this.setState({results})
            }
            else
                this.setState({results: []})
            this.forceUpdate()
        }, (error) => {
            console.log("err", error);
        });
    }

    nextAddress(id) {
        let visited = "false"
        window.swal(swalConfig).then((result) => {
            var P = Parse.Object.extend("Adresse");
            var query = new Parse.Query(P);
            query.get(id)
                .then((address) => {
                    if (result.value) visited = "true"
                    address.set("status", visited);
                    address.save();
                    this.getAddressList()
                }, (error) => {
                    console.log(error);
                });
        })
    }

    render() {
        if (!this.state.results) {
            return (
                <div>
                    <div className={"text-center"}> Aucune adresse diponible</div>
                </div>
            )
        }

        return (
            <div>
                <div className="homeHeader mb-4">
                    <div className="justify-content-center">
                        <div className={"col-12"}>
                            <button className={"btn btn-outline-light mb-4 rounded "}
                                    onClick={() => this.props.history.push("home")}>Retour
                            </button>
                            <h5 className={"text-center mt-4 mb-1 text-light"}>Adresses à revisiter
                                ({this.state.results.length})</h5>
                        </div>
                    </div>
                </div>
                <div className={"ml-2 mr-2"}>
                    {this.state.results.map(address => {
                        return (
                            <div key={address.id} className={"col-12 col-md-4 offset-md-4 "}>
                                <div className={"card mb-3 "}>
                                    <div className="card-body">
                                        <h5>{address.get("nom")} </h5>
                                        <h5 className={"text-muted"}>{address.get("full_address")} </h5>
                                        <button className="btn btn-dark col-12"
                                                onClick={() => this.nextAddress(address.id)}>Visitée
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default Unreached