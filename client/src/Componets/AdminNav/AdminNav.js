import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout } from '../../API/Auth/Auth';
import Brand from '../Brand/Brand';
import './AdminNav.css';
const AdminNav = ({history})=> {
    const handleLogout = ()=> {
        signout(()=> {
            history.push('/login')
        })
    }
    return (
        <div className='admin_nav'>
         <Brand/>
        <div className='admin_nav_links'>
            <Link to='/admin/dashboard'> <div className='links' >Dashboard</div></Link>
            <Link to='/admin/getorders'><div className='links'>Orders</div></Link>
            <Link to='/admin/createProduct'>  <div className='links'>Add Menu</div></Link>
        </div>
        <div className='admin_nav_auth'>
             <p onClick={handleLogout}>Logout</p>
             
        </div>

    </div>
    )
}
export default withRouter(AdminNav)