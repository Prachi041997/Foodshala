
import {API} from '../../../src/Backend';

export const createProducts = (id, token, product)=> {
    console.log('Hii')
    console.log(id, token, product)
    fetch(`/admin/product/create/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response =>{
        console.log(response);
       return response.json()
    })
    .catch(err=> console.log(err))
    
}

export const getProductsOfResturant = (id)=> {
    return fetch(`/getProducts/${id}`, {
        method: "GET",
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err))
}