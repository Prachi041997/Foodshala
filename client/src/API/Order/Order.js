
import {API} from '../../Backend'
export const createOrder = (token, resturantId,userId, order)=> {
    return fetch(`/order/create/${resturantId}/${userId}`, {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    }).then(response=> response.json())
    .catch(err=> console.log(err))
}

export const getOrders = (id, token)=> {
    return fetch(`/getorders/${id}`, {
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response=> response.json())
    .catch(err=> console.log(err))
}