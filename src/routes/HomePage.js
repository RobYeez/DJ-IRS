import React from 'react'
//add imports to other places?
import {Link} from 'react-router-dom'

//Landing page
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <nav>
            <ul>
            <li>
                <Link to="/">IndexHome</Link>
            </li>
            <li>
                <Link to="/UserPage">IndexUser</Link>
            </li>
            <li>
                <Link to="/login">IndexLogin</Link>
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