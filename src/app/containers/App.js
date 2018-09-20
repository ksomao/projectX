import Parse from "parse";
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from "./Register";
import Map from './Map'
import Unreached from "./Unreached";
Parse.initialize(
    "MOTh037AhpzvdgsTgWOyxCJfKEg1ZLF3NyCVvuiw",
    "yUCMLoQAsjLvaITzK1voqGnQWE7EPjah57xpBIta"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/home' component={Home}/>
{/*
                    <Route path='/register' component={Register}/>
*/}
                    <Route path='/map' component={Map}/>
                    <Route path='/unreached' component={Unreached}/>
                    <Route path='*' component={Login}/>
                </Switch>
            </Router>
        )
    }

}

export default App
