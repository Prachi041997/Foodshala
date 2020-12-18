// import {} from '../../../src/Backend';

export const adminRegister = (formdata)=> {
    return fetch(`/admin/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
          },
          body: formdata
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err))

}

export const customerRegister = (user)=> {
    return fetch(`/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err))

}

export const customerLogin = (user)=> {
    return fetch(`/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err))

}

export const adminLogin = (user)=> {
    return fetch(`/admin/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err))

}

export const isAuthenticated = ()=> {
    if(typeof(window)=== undefined) {
        return false;
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }else {
        return false;
    }
}

export const authenticate = (data, next)=> {
    if(typeof(window)!== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data) );
        next();
    }
}

export const signout = (next)=> {
    if(typeof(window)!== undefined) {
        localStorage.removeItem("jwt")
        next();

        return fetch(`/signout`, {
            method: "GET"
        })
        .then(data => {
           return data.json()
        }).catch(err => console.log(err));
    }  
}