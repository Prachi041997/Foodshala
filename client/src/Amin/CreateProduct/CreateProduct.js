import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../API/Auth/Auth';
import AdminNav from '../../Componets/AdminNav/AdminNav';
import './CreateProduct.css'


const CreateProduct = () => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        photo: "",
        category: "",
        error: "",
        success: false,
        createdProduct: "",
        loading: false,
        formData: "",
    })

    const { name, description, price, category, loading, error, formData, createdProduct, success } = values;

    const { resturant, token } = isAuthenticated();
    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
    }, [])

    const handleChange = (name) => event => {
        console.log(event.target.value)
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true })
        console.log(formData);
        fetch(`/admin/product/create/${resturant.id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(response => {
                console.log(response);
                return response.json()
            }).then(data => {
                console.log(data)
                if (data.errors) {
                    setValues({ ...values, error: data.errors, loading: false, success: false })
                } else {
                    console.log(data);
                    console.log("hii");
                    setValues({
                        ...values,
                        loading: false,
                        success: true,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        stock: "",
                        category: "",
                        createdProduct: data.name
                    })
                }
            })
            .catch(err => console.log(err))

    }

    const showScuccesMessage = ()=> {
        if(values.success){
            return <h5>Product Created Successfully</h5>
        }
    }
    const createProductForm = () => {
        return <form>


            <input type="text" class="createproduct_input" placeholder="Name" value={values.name} onChange={handleChange('name')}></input>
            <br></br>

            <input type="text" class="createproduct_input" placeholder="Description" value={values.description} onChange={handleChange('description')} ></input>
            <br></br>

            <input type="number" class="createproduct_input" placeholder="Price" value={values.price} onChange={handleChange('price')} ></input>
            <br></br>


            <div class="form-group form-radio mb-4">
                {/* <label>Category </label>
                <br></br> */}

                <input type="radio" class="form-radio-input" name='preference' value='v' onChange={handleChange('category')}></input>
                <label class="form-check-label" for="exampleCheck1" style={{ marginRight: '15px' }} >Veg</label>

                <input type="radio" class="form-radio-input" name='preference' value='nv' onChange={handleChange('category')} ></input>
                <label class="form-check-label" for="exampleCheck1" style={{ marginRight: '15px' }} value='nv'>Non-Veg</label>
            </div>

            <div className="form-group">
                <label >Choose Image</label>
                <input onChange={handleChange("photo")} type="file"

                    class="form-control-file" ></input>
            </div>
            <button type="submit" class="createproduct_submit" onClick={handleSubmit} >Create Product</button>
        </form>
    }

    return (
        <React.Fragment>
            <AdminNav />
            <div className='createproduct'>
                <h3>Add items to the Menu.</h3>
                {showScuccesMessage()}

                {createProductForm()}
            </div>

        </React.Fragment>
    )
}
export default CreateProduct;