import React from 'react'
import {connect} from 'react-redux'
import addressesJson from '../addressList'
import Parse from 'parse'
import {point, featureCollection} from '@turf/helpers'
import nearestPoint from '@turf/nearest-point'
import * as Nominatim from "nominatim-browser";
import {Link} from 'react-router-dom'


class Login extends React.Component {
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

 async  SignIn(){
    const user = await Parse.User.logIn("myname", "mypass");
  }

    render() {
        return (
            <div className={"main-container "}>
              <div className="row m-0 mb-2 justify-content-center">
            <input type="text" placeholder="Enter Username" name="uname" required/>
            <input type="password" placeholder="Enter Password" name="password" required/>
            <a href="#" className="btn btn-dark button offset-col-2 col-6"
                               onClick={() => this.SignIn()}>Login</a>
            </div>
             
            </div>
        )
    }
}

export default Login

