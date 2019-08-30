import React from 'react'

import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthentitacted} from '../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#ffa726'}
  else
    return {color: '#ffffff'}
}
const Menu = withRouter(({history}) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
      </li>

      { !isAuthentitacted() && (
        <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
        </li>
        </React.Fragment>
      )}

      { isAuthentitacted() && (
        <React.Fragment>
          <li className="nav-item">
            <a className="nav-link" 
            style={
              (isActive(history, '/signout'),
              { cursor : "pointer", color: "#fff"}
            )} 
            onClick={()=> signout(()=> history.push('/'))}>Signout</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" 
              style={
                (isActive(history, '/signout'),
                { cursor : "pointer", color: "#fff"}
              )} 
              >{isAuthentitacted().user.name}</a>
          </li>
      </React.Fragment>
      )}
    </ul>
  </div>
))

export default Menu