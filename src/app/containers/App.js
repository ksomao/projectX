import React from 'react'
import Parse from 'parse'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Map from './Map'


class App extends React.Component {

    componentDidMount() {
        Parse.initialize("jHDo5TQXzdahcIJDfBXXiwuVym1QSEXyf7B1Ir9B", "1tJZZEGBlHOOOvbujLTs7ZnDg2uAWarTkyYzIh70"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
        Parse.serverURL = "https://parseapi.back4app.com/";
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/map' component={Map}/>
                    <Route path='*' component={Home}/>
                </Switch>
            </Router>
        )
    }

}

export default App
