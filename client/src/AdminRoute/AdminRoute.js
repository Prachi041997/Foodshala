import React from 'react';
import {Redirect, Route} from "react-router-dom";
import { isAuthenticated } from '../API/Auth/Auth';


const AdminRoute = ({ component: Component, ...rest })=> {
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
          isAuthenticated()  && isAuthenticated().resturant? (
            <Component {...props} />
          ) :isAuthenticated() && isAuthenticated().customer?(
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          ): null
            }
      />
    );
  }

  export default AdminRoute;