import React from 'react'
import Parse from 'parse'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from "./Register";
import Map from './Map'
import ParseInit from '../lib/parseInit'
ParseInit()

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/map' component={Map}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='*' component={Home}/>
                </Switch>
            </Router>
        )
    }

}

export default App
