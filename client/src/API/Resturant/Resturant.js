import {API} from '../../../src/Backend';

export const getResturants = ()=> {
   return fetch(`/getallresturants`, {
        method:'GET'
    })
         .then(response=> response.json())
         .catch(err=> console.log(err))
}
export const getResturantsbyType = (type)=> {
     return fetch(`/getresturants/type/${type}`, {
          method:'GET'
     }).then(data=> data.json())
     .catch(err=> console.log(err))
}