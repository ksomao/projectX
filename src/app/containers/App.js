import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './Home'
import Map from './Map'

const App = props => {
    return (
        <Router>
            <Switch>
                <Route path='/map' component={Map}/>
                <Route path='*' component={Home}/>
            </Switch>
        </Router>
    )
}

export default App
