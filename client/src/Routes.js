import React from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import Signup from './Amin/Signup/Signup';
import CustomerSignup from './Customer/Signup/Signup';
import Home from './Customer/Home/Home';
import Login from './Login/Login';
import CreateProduct from './Amin/CreateProduct/CreateProduct';
import AdminDashBoard from './Amin/Dashboard/Dashboard';
import ResturantMenu from './Customer/ResturantMenu/ResturantMenu';
import Cart from './Customer/Cart/Cart';
import CustomerRoute from './AdminRoute/CustomerRoute';
import AdminRoute from './AdminRoute/AdminRoute';
import Payment from './Payment/Payment';
import Orders from './Amin/Orders/Order';


const Routes = ()=> {
   return <BrowserRouter>
       <Switch>
       
        <Route path='/admin/signup' exact component={Signup}></Route>
        <Route path='/signup' exact component={CustomerSignup}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/' exact component={Home}></Route>
        <AdminRoute path='/admin/createProduct' exact component={CreateProduct}></AdminRoute>
        <Route path='/admin/dashboard' exact component={AdminDashBoard}></Route>
        <Route path='/menu/resturant/:resturantId' exact component={ResturantMenu}></Route>
        <Route path='/cart' exact component={Cart}></Route>
        <CustomerRoute path='/ordersuccessful/:orderId' exact component={Payment}></CustomerRoute>
        <AdminRoute path='/admin/getorders' exact component={Orders}></AdminRoute>
        

        

        
        


        

        
       </Switch>
      </BrowserRouter>
}
export default Routes;
