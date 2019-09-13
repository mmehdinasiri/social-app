import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthentitacted } from './index'


const PrivateRoute = ({component: Component , ...rest}) =>(
  <Route 
    {...rest} 
    render={props => ( isAuthentitacted() ? (
      <Component {...props}/>
    ):(
      <Redirect to={{
        pathname: '/signin', 
        state: {from: props.location}
      }}/>
    )
  )}
  />
)
export default PrivateRoute;