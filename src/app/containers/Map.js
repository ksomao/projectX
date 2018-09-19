import React from 'react'
import {connect} from 'react-redux'
import Parse from "parse";

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLongitude: undefined,
            userLatitude: undefined,
            selected: undefined,
            map: undefined,
            isUserPositionUpdated: false,
            error: false
        }
    }

    componentDidMount() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            if (!window.ymaps) {
                let s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = `https://api-maps.yandex.ru/2.1/?lang=en_US`;
                let x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
                s.addEventListener('load', e => {
                    this.init()
                })
            } else {
                this.init()
            }
        } else {
            this.props.history.push('/')
        }
    }


    init() {
        try {
            window.ymaps.ready(() => {
                let map = new window.ymaps.Map("map", {
                    center: [50.8330918, 4.376145999999999],
                    zoom: 10
                });
                this.setState({map}, () => {
                    this.destinationDirections(this.state.map)
                })
            })
        } catch (e) {
            this.setState({error: true})
        }
    }

    destinationDirections(map) {
        try {
            var pointA = this.props.location.state.myPosition,
                pointB = this.props.location.state.destination,
                multiRoute = new window.ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        pointA,
                        pointB
                    ],
                    params: {routingMode: 'pedestrian'}
                }, {
                    boundsAutoApply: true
                });
            map.geoObjects.add(multiRoute);
        } catch (e) {
            this.props.history.push('/home')
        }

    }

    render() {
        return (
            <div>
                <div className={""}>
                    <div className={"bg-light p-4 headerMap"}>
                        <button className={"btn btn-outline-light mb-4 rounded "}
                                onClick={() => this.props.history.goBack()}>Retour
                        </button>
                        <h1 className={"text-center text-white"}>Itinéraire</h1>
                    </div>
                    <div style={{width: "100%", height: "70vh", padding: 16}} id="map" ref="map"/>
                    <div id="printoutPanel"></div>
                </div>
                {this.state.error &&
                <div style={{alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{backgroundColor: "white", width: "100%", height: "40vh", padding: 16}}>
                        <p>no no no</p>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        birds: state.birds.list.data,
        isLoading: state.birds.list.loading
    }
}
export default connect(mapStateToProps)(Map)