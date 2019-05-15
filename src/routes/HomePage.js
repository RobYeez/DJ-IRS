import React from 'react'
//add imports to other places?
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

//Landing page
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
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
    )
  }
}
export default HomePage