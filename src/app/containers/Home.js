import React from 'react'
import {connect} from 'react-redux'
import addressesJson from '../addressList'
import Parse from 'parse'
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

    async saveUser() {
        const location = new Parse.GeoPoint(50.8282679, 4.374196299999999);
        var query = new Parse.Query('Adresse');
        query.near("location", location);
        query.limit(3);
        query.find().then(function (results) {
            console.log("res", results);
        }, function (error) {
            console.log("err", error);
        });

        /*        query.find()
            .then((gameScore) => {

                console.log(gameScore);
                // The object was retrieved successfully.
            }, (error) => {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                console.log(error);
            })*/
        ;

        /*

        const location = new Parse.GeoPoint(50.8282679, 4.374196299999999);
// Create a query for places
        const query = new Parse.Query(PlaceObject);
// Interested in locations near user.
        query.near("location", userGeoPoint);
// Limit what could be a lot of points.
        query.limit(10);
// Final list of objects
        const placesObjects = await
        query.find();*/
        /*  var user = new Parse.User();
          user.save({
              username: 'sampeusername',
              email: 'sample@email.com',
              password: '123456'
          }, {
              success: function (response) {
                  alert('New object create with success! ObjectId: ' + response.id + `, ` + user.get('username'));
              },
              error: function (response, error) {
                  alert('Error: ' + error.message);
              }
          });*/
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
        Nominatim.reverseGeocode({lat, lon, addressdetails: true})
            .then((result) => {
                if (result.house_number) {
                    let fullAdress = result.house_number + " " + result.address.road + ", " + "1050 Ixelles, Belgique"
                    this.setState({fullAdress})
                }
                else {
                    let fullAdress = result.address.road + ", " + "1050 Ixelles Belgique"
                    this.setState({fullAdress})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    nextAddress() {

        let visited = null
        window.swal({
            title: 'Confirmer',
            text: "Avez-vous pû discuter avec quelqu'un à cette adresse ? ",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#222',
            cancelButtonColor: '#d33',
            cancelButtonText: 'non',
            confirmButtonText: 'oui'
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
                                <h3 className="text-uppercase text-white mt-2 nom">{this.state.selected.nom}</h3>
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
                        <div className="row m-0 mb-2 justify-content-center">
                            <a href="#" className="btn btn-dark button offset-col-2 col-6"
                               onClick={() => this.saveUser()}>user</a>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div><img src="../images/loading.gif" alt=""/></div>
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

