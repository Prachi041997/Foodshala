import React, { useState, useEffect } from 'react';
import './Signup.css';
import img from './img.png'
import Brand from '../../Componets/Brand/Brand';
import ContainerImage from '../../Componets/ConatinerImage/ContainerImage';
import { adminRegister, authenticate } from '../../API/Auth/Auth';
import {Redirect} from 'react-router-dom';
import SkeletonLoader from 'tiny-skeleton-loader-react';

const Signup = () => {

   const [resInfo, setResInfo] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      description: "",
      address1: "",
      address2: "",
      city: "",
      pin: "",
      avgcost: "",
      deliveryRadius: "",
      type: "",
      photo:'',
      formData: ''
   })

   const [utility, setUtility] = useState({
      loading: "",
      error: "",
      didRedirect: ""
   })

   useEffect(() => {
      setResInfo({ ...resInfo, formData: new FormData() })
  }, [])

   const onSignup = (e) => {
      e.preventDefault();
      setUtility({ ...utility, loading: true, error: false })
      adminRegister(resInfo.formData)
         .then(result => {
            console.log(result)
            setUtility({...utility, loading: false})
            if (result.errors) {
             
               setUtility({...utility, error: result.errors });
            } else {
               authenticate(result, () => {
                  setUtility({ ...utility, didRedirect: true , error: ""})
               })
            }
         }).catch(err => {
            setUtility({...utility, loading: false})
            console.log(err)
         })
   }

   const onChangeHandle = name => event => {
      console.log(event.target.value)
      const value = name === 'photo' ? event.target.files[0] : event.target.value;
      resInfo.formData.set(name, value);
      setResInfo({ ...resInfo, [name]: value });
   }

   const performRedirect = ()=> {
      if(utility.didRedirect) {
         console.log('inside')
          return <Redirect to="/admin/dashboard"></Redirect>
      }
  }

  const showLoader = ()=> {
   return utility.loading && <SkeletonLoader background=' #423b66' height='8px'></SkeletonLoader>
}

   const SignupForm = () => {
      return <form>
         
         {utility.error? <p className='error'>{utility.error}</p>: null}
            
            <input type="text" class="signup_input" placeholder="Name" name='name' onChange={onChangeHandle('name')}></input>
            <br></br>
           
            <input type="email" class="signup_input"   placeholder="Email" name='email' onChange={onChangeHandle('email')}></input>

            <br></br>
    
            <input type="number" class="signup_input" placeholder="Phone number" name='phone' onChange={onChangeHandle('phone')}></input>

            <br></br>
    
            <input type="password" class="signup_input"  placeholder="Password" name='password' onChange={onChangeHandle('password')}></input>
         
            <br></br>
        
            <input type="text" class="signup_input" placeholder="Description" name='description' onChange={onChangeHandle('description')}></input>

            <br></br>
     
            <input type="text" class="signup_input" placeholder="Area, Street" name='address1' onChange={onChangeHandle('address1')}></input>

         
            <br></br>
           
            <input type="text" class="signup_input" placeholder="House number" name='address2' onChange={onChangeHandle('address2')}></input>

            <br></br>
     
            <input type="text" class="signup_input" placeholder=" City" name='city' onChange={onChangeHandle('city')}></input>

            <br></br>
    
            <input type="number" class="signup_input" placeholder="PIN" name='pin' onChange={onChangeHandle('pin')}></input>

            <br></br>
            
            <input type="number" class="signup_input" placeholder="Average Cost a person" name='avgcost' onChange={onChangeHandle('avgcost')}></input>

            <br></br>

            
            <input type="number" class="signup_input" placeholder="Delivery Radius(km)" name='deliveryRadius' onChange={onChangeHandle('deliveryRadius')}></input>
            <br></br>
         

         <div class="form-group form-radio">

            <input type="radio" class="form-radio-input" name='type' value='v' onChange={onChangeHandle('type')}></input>
            <label class="form-check-label" for="exampleCheck1" style={{ marginRight: '15px' }}>Veg</label>

            <input type="radio" class="form-radio-input" name='type' value='nv' onChange={onChangeHandle('type')}></input>
            <label class="form-check-label" for="exampleCheck1" style={{ marginRight: '15px' }}>Non-Veg</label>
         </div>

         <div className="form-group">
                <label >Choose Image</label>
                <input onChange={onChangeHandle("photo")} type="file"

                    class="form-control-file" ></input>
            </div>
         <button type="submit" class="signup_submit resturant_bgcolor" onClick={onSignup}>Register</button>
      </form>
   }
   return (
      <React.Fragment>
         {performRedirect()}
         {showLoader()}
         <Brand />
         <div className='signup_container'>
            
            <h4>We have amazing userbase who would love to <br></br>
            taste ypur favourite dishes</h4>
            
            <h1>Register & Start Selling Now !</h1>
            <hr></hr>
            <h6>Fill up the form, <br></br>We are just 5 minutes away to have a great meal 🍴</h6>
               {SignupForm()}
         </div>
            

         
      </React.Fragment>
   )
}

export default Signup;