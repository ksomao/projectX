import React from 'react'
import {connect} from 'react-redux'
import load from 'load-script'


class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLongitude: undefined,
            userLatitude: undefined,
            selected: undefined,
            map: undefined,
            isMapReady: false,
            isUserPositionUpdated: false,
        }
    }

    componentDidMount() {
        window.ymaps.ready(() => this.init())
    }

    init() {
        this.setState({isMapReady: true})
        let map = new window.ymaps.Map("map", {
            center: [50.8330918, 4.376145999999999],
            zoom: 10
        });
        this.setState({map})
        this.destinationDirections()
    }


    destinationDirections() {
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
        this.state.map.geoObjects.add(multiRoute);
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
                    <div style={{width: "100%", height: "70vh", padding: 16}} id="map"/>
                    <div id="printoutPanel"></div>
                </div>
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
