import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { authenticate, customerRegister } from '../../API/Auth/Auth';
import Brand from '../../Componets/Brand/Brand';
import ContainerImage from '../../Componets/ConatinerImage/ContainerImage';
import img from './image.png';
import './Signup.css';
import SkeletonLoader from 'tiny-skeleton-loader-react';

const CustomerSignup = ({history})=> {

   const [custInfo, setCustInfo] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      preference: ''
   })
   const [utility, setUtility] = useState({
      error: '',
      loading: '',
      didRedirect: ""
   })

   const onChangeHandle = name => event => {
      setCustInfo({ ...custInfo, [name]: event.target.value })
   }
   
   const onSignupHandle = (e)=> {
      e.preventDefault();
      setUtility({...utility,loading:true})
      customerRegister({...custInfo})
      .then(data=> {
         console.log(data);
         setUtility({...utility, loading:false})
         if(data.error){
            var warning = {
               name: "",
               email: "",
               phone: "",
               password: "",
               preference: ''
            }
            data.error.map(err => {
               console.log(err.param);
               console.log(err.msg)
               warning[err.param] = err.msg
            })
            setUtility({...utility, error: warning });
         }else{
            authenticate(data, ()=> {
               setUtility({ ...utility, didRedirect: true , error: ""})
            })
         }
      })
   }
    const SignupForm = ()=> {
        return <form>
        
        {utility.error.name? <p className='error'>{utility.error.name}</p>: null}
           
           <input type="text" className="signup_input" placeholder="Name" onChange={onChangeHandle('name')}></input>
           <br></br>

        
        
        {utility.error.email? <p className='error'>{utility.error.email}</p>: null}
           
           <input type="email" class="signup_input" placeholder="Email" onChange={onChangeHandle('email')}></input>
           <br></br>

        

        
        {utility.error.phone? <p className='error'>{utility.error.phone}</p>: null}
           
           <input type="number" class="signup_input" placeholder="Phone number" onChange={onChangeHandle('phone')}></input>
           <br></br>
        

        
        {utility.error.password? <p className='error'>{utility.error.password}</p>: null}
           
           <input type="password" class="signup_input" placeholder="Password" onChange={onChangeHandle('password')}></input>
        
           <br></br>
       
        
        {utility.error.preference? <p className='error'>{utility.error.preference}</p>: null}
           <input type="radio" class="form-radio-input" name='preference' value='v' onChange={onChangeHandle('preference')}></input>
           <label class="form-check-label" style={{ marginLeft: '6px', marginRight:'20px' }}>Veg</label>

           <input type="radio" class="form-radio-input" name='preference' value='nv' onChange={onChangeHandle('preference')}></input>
           <label class="form-check-label" style={{ marginLeft: '6px' }}>Non-Veg</label>

           <br></br>
        
        <button type="submit" class="signup_submit user_bgcolor" onClick={onSignupHandle}>Register</button>
     </form>

    }

    const performRedirect = ()=> {
      if(utility.didRedirect) {
         history.push('/');
      }
    }

    const showLoader = ()=> {
      return utility.loading && <SkeletonLoader background=' #423b66' height='8px'></SkeletonLoader>
   }
   return(
       <React.Fragment>
          {performRedirect()}
          {showLoader()}
          <Brand/>
            <div className='customersignup_container'>
            <h5>We have a great taste about <span>dishes</span></h5>
            <h3>For you to start eating yummy,</h3>
            <h1>Register & Order Now !</h1>
            <hr></hr>
            <h6>Fill up the form, <br></br>We are just 5 minutes away to have a great meal 🍴</h6>
            {SignupForm()}
            {/* <ContainerImage img={img}/> */}

         </div>
       </React.Fragment>
   )
}
export default withRouter(CustomerSignup);