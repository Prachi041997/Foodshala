export const addItemToCart = (item,   next)=> {
    console.log(item);
    item.updatedAt = undefined;
    item.createdAt = undefined;
    item.__v = undefined;
    
    item.category = undefined;
    item.quantity = 1;
    let cart;
    if(typeof(window)!==undefined){
        if(!localStorage.getItem("cart")){
          console.log(item)
          cart={
               resturantId: item.resturant_info,
               food: [item]
           }
          localStorage.setItem("cart", JSON.stringify(cart));
          next(true);
        } else{
            let cartcpy = JSON.parse(localStorage.getItem("cart"))

            if(cartcpy.resturantId === item.resturant_info ){
                cartcpy.food = [...cartcpy.food, item]
                localStorage.setItem("cart", JSON.stringify(cartcpy));
                next(true);
            }
            else {
                next(false)
            }
        }
    }
}

export const updateQuantity = (quantity, id)=> {
    console.log(quantity);
    if(quantity>=1){
        if(typeof(window)!== undefined){
            let cartCpy = JSON.parse(localStorage.getItem("cart"));
            console.log(cartCpy);
            let elmIndex = cartCpy.food.findIndex(elem=> elem._id === id);
            let newArray = [...cartCpy.food];
            newArray[elmIndex] = {...newArray[elmIndex], quantity: quantity};
            cartCpy.food = newArray;
            localStorage.setItem("cart", JSON.stringify(cartCpy));
            
            
          }
    }
}

export const removeItemFromCart = (productId)=> {
    let cartCpy;
    if(typeof(window)!== undefined) {
        if(localStorage.getItem("cart")) {
            cartCpy = JSON.parse(localStorage.getItem("cart")) 
           
             } 
                
              cartCpy.food.map((p, i)=> {
                    if(p._id === productId)
                     {
                         cartCpy.food.splice(i, 1);
                     }
                })
                  
                localStorage.setItem("cart", JSON.stringify(cartCpy));
       
    }
    return cartCpy;
}

export const loadCart = ()=> {
    if(typeof(window)!== undefined) {
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")) 
        }
    }
}

export const cartEmpty = ()=> {
    if(typeof(window)!== undefined) {
        let cart = [];
        localStorage.removeItem("cart");
    }
}