import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/index.css';
import * as serviceWorker from './serviceWorker';
//import pages here for new pages
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomePage from './routes/HomePage';
import SignUp from './routes/Signup';
import Login from './routes/Login';
import UserPage from './routes/UserPage';
import Room from './routes/Room';
import NotFound from './routes/notfound';



//Keep it simple by just implementing where to route
const routing = (
    <Router>
        <Switch>
            {/* Add Routes here  */}
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/userpage" component={UserPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/room" component={Room} />
            <Route component={NotFound} />
        </Switch> 
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



