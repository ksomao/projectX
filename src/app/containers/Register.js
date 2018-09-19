import React from 'react'
import {connect} from 'react-redux'
import addressesJson from '../addressList'
import Parse from 'parse'
import {point, featureCollection} from '@turf/helpers'
import nearestPoint from '@turf/nearest-point'
import * as Nominatim from "nominatim-browser";
import {Link} from 'react-router-dom'


class Register extends React.Component {
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

   
    async AddUser(){
        var user = new Parse.User();
        user.set("username", document.getElementsByName("user"));
        user.set("password", "mypass");
        user.set("email", "email2@example.com");
        
        // other fields can be set just like with Parse.Object
        user.set("phone", "415-392-0202");
        try {
         await user.signUp();
          // Hooray! Let them use the app now.
        } catch (error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      }

    render() {
        return (
            <div className={"main-container "}>

            <div className="row m-0 mb-2 justify-content-center">
            <input type="text" placeholder="Enter Username" name="username" required/>
            <input type="text" placeholder="Enter Username" name="email" required/>
            
                
                <input type="password" placeholder="Enter Password" name="password" required/>
                <a href="#" className="btn btn-dark button offset-col-2 col-6"
                               onClick={() => this.AddUser()}>Sign Up</a>
            </div>
   </div>
   
          
        )
    }
}

export default Register

