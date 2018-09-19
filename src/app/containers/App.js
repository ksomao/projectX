import React from 'react'
import Parse from 'parse'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Map from './Map'


class App extends React.Component {

    componentDidMount() {
        Parse.initialize("MOTh037AhpzvdgsTgWOyxCJfKEg1ZLF3NyCVvuiw", "yUCMLoQAsjLvaITzK1voqGnQWE7EPjah57xpBIta"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
        Parse.serverURL = "https://parseapi.back4app.com/";
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/map' component={Map}/>
                    <Route path='/Register' component={Register}/>
                    <Route path='/Login' component={Login}/>
                    <Route path='*' component={Home}/>
                </Switch>
            </Router>
        )
    }

}

export default App
