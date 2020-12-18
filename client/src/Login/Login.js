import React, { useState } from 'react';
import { authenticate, customerLogin, adminLogin } from '../API/Auth/Auth';
import Brand from '../Componets/Brand/Brand';
import './Login.css';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { Link, Redirect, withRouter } from 'react-router-dom';

const Login = ({ history }) => {

    const [custInfo, setCustInfo] = useState({
        email: '',
        password: '',
        loading: '',
        error: '',
        didredirect: ''
    })

    const [adminInfo, setAdminInfo] = useState({
        email: '',
        password: '',
        loading: '',
        error: '',
        didredirect: ''
    })
    const custOnchange = name => event => {
        setCustInfo({ ...custInfo, [name]: event.target.value })
    }

    const adminOnchange = name =>event=> {
        setAdminInfo({...adminInfo, [name]: event.target.value})
    }

    const custLogin = (e) => {
        e.preventDefault();
        setCustInfo({ ...custInfo, loading: true, err: "" })
        customerLogin({ ...custInfo })
            .then(data => {
                console.log(data);
                setCustInfo({ ...custInfo, loading: false })
                if (data.error) {
                    if (Array.isArray(data.error)) {
                        setCustInfo({ ...custInfo, error: "Please fill all the fields" })
                    }
                
                     else {
                        setCustInfo({ ...custInfo, error: data.error })
                    }

                } else {
                    authenticate(data, () => {
                        setCustInfo({ ...custInfo, didredirect: true, error: "" })
                    })
                }
            })

    }
    const onAdminLogin = (e) => {
        e.preventDefault();
        setAdminInfo({ ...adminInfo, loading: true, err: "" })
        adminLogin({ ...adminInfo })
            .then(data => {
                console.log(data);
                setAdminInfo({ ...adminInfo, loading: false })
                if (data.error) {
                    if (Array.isArray(data.error)) {
                       
                        setAdminInfo({ ...adminInfo, error: "Please fill all the fields" })
                    } else {
                        setAdminInfo({ ...adminInfo, error: data.error })
                    }

                } else {
                    authenticate(data, () => {
                        setAdminInfo({ ...adminInfo, didredirect: true, error: "" })
                    })
                }
            })

    }

    const performRedirect = () => {
        if (custInfo.didredirect) {
            history.goBack();
        }
        else if(adminInfo.didredirect){
            return <Redirect to='/admin/dashboard'></Redirect>
        }
    }

    const showLoader = () => {
        return custInfo.loading || adminInfo.loading&& <SkeletonLoader background=' #423b66' height='8px'></SkeletonLoader>
    }

    const AdminLoginForm = () => {
        return <form>

            
            {Array.isArray(adminInfo.error.length )?null:  <p className='error'>{adminInfo.error}</p>}
                {adminInfo.error.email ? <p className='error'>{adminInfo.error.email}</p> : null}
                <input type="email" class="login_input"  placeholder="email" onChange={adminOnchange('email')}></input>
                <br></br>

            

           
            {adminInfo.error.password ? <p className='error'>{adminInfo.error.password}</p> : null}
                
                <input type="password" class="login_input" id="exampleInputPassword1" placeholder="Password" onChange={adminOnchange('password')}></input>
                <br></br>
            <button type="submit" class="login_submit login_admin_bgcolor" onClick={onAdminLogin}>Login As A Resturant</button>
            <Link to='/admin/signup'><h6 className='customer_signuplink'>Haven't registered yet? Register</h6></Link>
        </form>
    }

    const CustomerLoginForm = () => {
        return <form>

            

                {Array.isArray(custInfo.error.length )?null:  <p className='error'>{custInfo.error}</p>}
                {custInfo.error.email ? <p className='error'>{custInfo.error.email}</p> : null}
                
                <input type="email" class="login_input" placeholder="email" onChange={custOnchange('email')}></input>
                <br></br>

            

            
                {custInfo.error.password ? <p className='error'>{custInfo.error.password}</p> : null}
                
                <input type="password" class="login_input"  placeholder="password" onChange={custOnchange('password')}></input>
                <br></br>
                <button type="submit" class="login_submit login_customer_bgcolor" onClick={custLogin}>Login As A User</button>
                <Link to='/signup'><h6 className='customer_signuplink'>Haven't registered yet? Register</h6></Link>
        </form>
    }
    return (
       <React.Fragment>
           <Brand/>
           {performRedirect()}
            {showLoader()}
           <div className='login_container'>
            
                <div className='login_admin'>
                   <h3>Are you a</h3>
                   <h1 className='login_admin_color'>User ?</h1>
                   <h5>You can enter in your account from this</h5>
                   <h5>window</h5>
                   {CustomerLoginForm()}
                </div>
                <div className='login_customer'>
                   <h3>Are you a</h3>
                   <h1 className='login_customer_color'>Restaurant ?</h1>
                   <h5>You can enter in your account from this</h5>
                   <h5>window</h5>
                   {AdminLoginForm()}
                </div>
        </div>
       </React.Fragment>
    )
}
export default withRouter(Login);