import React from 'react';
import {Redirect, Route} from "react-router-dom";
import { isAuthenticated } from '../API/Auth/Auth';


const CustomerRoute = ({ component: Component, ...rest })=> {
    return (
      <Route
        {...rest}
        render={(props) =>
           !isAuthenticated() ?(
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
           ):
          isAuthenticated()  && isAuthenticated().customer? (
            <Component {...props} />
          ) :isAuthenticated() && isAuthenticated().resturant?(
            <Redirect
              to={{
                pathname: "/admin/dashboard",
                state: { from: props.location }
              }}
            />
          ): null
            }
      />
    );
  }

  export default CustomerRoute;