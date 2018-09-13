import React from 'react'
import {connect} from 'react-redux'
import addressesJson from '../addressList'
import {point, featureCollection} from '@turf/helpers'
import nearestPoint from '@turf/nearest-point'
import * as Nominatim from "nominatim-browser";
import {Link} from 'react-router-dom'


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
        }
    }

    componentDidMount() {
        this.getCurrentPosition(true)
        this.setState({addresses: addressesJson})
    }

    addressesInitialization() {
        let points
        let latitude
        let longitude
        let collection = []
        let targetPoint = point([this.state.userLatitude, this.state.userLongitude]);
        console.log("targetPoint", targetPoint);

        this.state.addresses.map(adr => {
            if (adr.status === "null") {
                latitude = parseFloat(adr.latitude)
                longitude = parseFloat(adr.longitude)
                collection.push(point([latitude, longitude]))
            } else {
                console.log("true adresse", adr);
            }
        })

        console.log("taille1", this.state.addresses.length);
        console.log("taille2", collection.length);

        points = featureCollection(collection);
        let nearest = nearestPoint(targetPoint, points);
        console.log("Arraypoint", points);
        console.log("NEAREST", nearest);

        this.state.addresses.filter((adr, index) => {
            if (adr.latitude == nearest.geometry.coordinates[0]
                && adr.longitude == nearest.geometry.coordinates[1] && adr.status === "null") {
                this.setState({selected: adr})
            }
        })
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

    reverseGecoding(lat, lon) {
        Nominatim.reverseGeocode({
            lat,
            lon,
            addressdetails: true
        })
            .then((result) => {
                console.log(result);
                console.log(result.display_name); // 'Minneapolis City Hall, South 4th Street, St Anthony West, Phillips, Minneapolis, Hennepin County, Minnesota, 55415, United States of America'

                // result.address is only returned when 'addressdetails: true' is sent in the request
                console.log(result.house_number);    // 'Minneapolis'
                if (result.house_number) {
                    let fullAdress = result.house_number + " " + result.address.road + ", " + "1050 Ixelles, Belgique"
                    this.setState({fullAdress})
                }
                else {
                    let fullAdress = result.address.road + ", " + "1050 Ixelles Belgique"
                    this.setState({fullAdress})
                }
                console.log("FULL", this.state.fullAdress);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    nextAddress() {

        let visited = null
        window.swal({
            title: 'Confirm',
            text: "Did you get to talk with someone",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) visited = true
            else visited = false

            let addressesTmp = this.state.addresses;
            addressesTmp = this.state.addresses.filter(adr => {
                if (adr.nom === this.state.selected.nom) {
                    adr.status = visited
                    return adr
                }
                return adr
            })

            this.setState({address: addressesTmp})
            this.addressesInitialization()
        })
    }

    renderCard() {
        if (this.state.selected) {
            return (
                <div className={"home-subContainer"}>
                    <div className="homeHeader">
                        <div className="offset-col-2 col-10 justify-content-center">
                            <div className={"col-12"}>
                                <h5 className="text-uppercase text-white mt-2 nom">{this.state.selected.nom}</h5>
                                <h5 className="mb-2 text-white adresse">{this.state.selected.full_address}</h5>
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
                                    destination: this.state.selected.full_address
                                }
                            }}
                                  className="btn btn-light mb-4 button col-6">Voir la carte </Link>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div>loading...</div>
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

