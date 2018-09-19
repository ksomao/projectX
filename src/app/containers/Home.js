import React from 'react'
import {connect} from 'react-redux'
import addressesJson from '../addressList'
import Parse from 'parse'
import {point, featureCollection} from '@turf/helpers'
import nearestPoint from '@turf/nearest-point'
import * as Nominatim from "nominatim-browser";
import {Link} from 'react-router-dom'

Parse.initialize(
    "MOTh037AhpzvdgsTgWOyxCJfKEg1ZLF3NyCVvuiw",
    "yUCMLoQAsjLvaITzK1voqGnQWE7EPjah57xpBIta");
Parse.serverURL = "https://parseapi.back4app.com/";

const swalConfig = {
    title: 'Confirmer',
    text: "Avez-vous pû discuter avec quelqu'un à cette adresse ? ",
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#222',
    cancelButtonColor: '#d33',
    cancelButtonText: 'non',
    confirmButtonText: 'oui'
}


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addresses: [],
            userLongitude: undefined,
            userLatitude: undefined,
            selected: undefined,
            map: undefined,
            isUserPositionUpdated: false,
            full_address: undefined,
            fullAdress: undefined
        }
    }


    componentDidMount() {
        this.getCurrentPosition()
    }


    getCurrentPosition(init = false) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log(pos.coords.latitude + " " + pos.coords.longitude);
                this.setState({userLatitude: pos.coords.latitude})
                this.setState({userLongitude: pos.coords.longitude}, () => {
                    this.addressesInitialization()
                    this.reverseGecoding(pos.coords.latitude, pos.coords.longitude)
                })
            });
        }
        else console.log("Geolocation is not supported by this browser.");
    }

    async addressesInitialization() {
        const location = new Parse.GeoPoint(
            this.state.userLatitude,
            this.state.userLongitude
        );
        var query = new Parse.Query('Adresse');
        query.near("location", location);
        query.equalTo("status", "null")
        query.limit(1);
        query.find().then((results) => {
            if (results[0]) {
                this.setState({selected: results[0]})
                this.setState({full_address: results[0].get("full_address")})
            }
            else
                alert("toute les addresses on été visitées")
        }, function (error) {
            console.log("err", error);
        });
    }

    reverseGecoding(lat, lon) {
        Nominatim.reverseGeocode({lat, lon, addressdetails: true})
            .then((result) => {
                if (result.house_number) {
                    let fullAdress = result.house_number + " "
                        + result.address.road + ", "
                        + "Bruxelles, Belgique"
                    this.setState({fullAdress})
                }
                else {
                    let fullAdress = result.address.road + ", "
                        + "Bruxelles, Belgique"
                    this.setState({fullAdress})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    nextAddress() {
        let visited = null
        window.swal(swalConfig).then((result) => {
            var P = Parse.Object.extend("Adresse");
            var query = new Parse.Query(P);
            query.get(this.state.selected.id)
                .then((address) => {
                    if (result.value) visited = "true"
                    else visited = "false"
                    address.set("status", visited);
                    address.save();
                    this.getCurrentPosition()
                }, (error) => {
                    console.log(error);
                });
        })
    }

    renderCard() {
        if (this.state.selected) {
            return (
                <div className={"home-subContainer"}>
                    <div className="homeHeader">
                        <div className="offset-col-2 col-10 justify-content-center">
                            <div className={"col-12"}>
                                <h3 className="text-uppercase text-white mt-2 nom">{this.state.selected.get("nom")}</h3>
                                <h5 className="mb-2 text-white adresse">{this.state.selected.get("full_address")}</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row m-0 mb-2 justify-content-center">
                            <a href="#" className="btn btn-dark button offset-col-2 col-6"
                               onClick={() => this.nextAddress()}>Adresse
                                Visitée</a>
                        </div>
                        <div className="row m-0 justify-content-center">
                            <Link to={{
                                pathname: "/map",
                                state: {
                                    myPosition: this.state.fullAdress,
                                    destination: this.state.full_address
                                }
                            }}
                                  className="btn btn-light mb-4 button col-6">Voir la carte </Link>
                        </div>
                        <div className="row m-0 mb-2 justify-content-center">
                            <a href="#" className="btn btn-dark button offset-col-2 col-6"
                               onClick={() => this.saveUser()}>user</a>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div>loading</div>
        }
    }

    render() {
        return (
            <div className={"main-container "}>
                {this.renderCard()}
            </div>
        )
    }
}

export default Home

