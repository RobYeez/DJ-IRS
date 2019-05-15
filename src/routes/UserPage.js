import React from 'react';
// import '../StyleSheets/HomePage.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";



class UserPage extends React.Component {
    render() {
        return (
          <div>
            <h1> User Page</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/UserPage">User</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/room">Room</Link>
                </li>
              </ul>
            </nav>
          </div>
        );
    }
}

export default UserPage