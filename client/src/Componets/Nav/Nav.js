import React from 'react';
import { Link , withRouter} from 'react-router-dom';
import { isAuthenticated, signout } from '../../API/Auth/Auth';
import Brand from '../Brand/Brand';
import './Nav.css'
const Nav = ({history})=> {

    const logoutHandle = ()=> {
        signout(()=> {
            history.push('/');
        })
    }
   return <div className='home_nav'>
                <Brand/>
               
                <div className='home_nav_auth'>
                <Link to='/cart' className='lo'><p>Cart</p></Link>
                     {!isAuthenticated() || !isAuthenticated().customer? (
                         <React.Fragment>
                             <Link to='/login'><p>Login</p></Link>
                             <Link to='/signup'><p>Register</p></Link>
                         </React.Fragment>
                     ): <p onClick={logoutHandle}>Logout</p> }
                </div>

            </div>
}
export default withRouter(Nav);