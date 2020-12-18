import React, { useEffect, useState } from 'react';
import { getResturants, getResturantsbyType } from '../../API/Resturant/Resturant';
// import { getResturants } from '../../API/Resturant/Resturant';
import Brand from '../../Componets/Brand/Brand';
import Card from '../../Componets/ResturantCard/ResturantCard';
import Nav from '../../Componets/Nav/Nav';
import './Home.css';

const Home = () => {

    const [values, setValues] = useState({
        resturants: [],
        error: ''
    })
    const [veg, setVeg] = useState({
        resturants: [],
        error: ''
    })
    const [check, setCheck] = useState(false);


    useEffect(() => {
        getResturants()
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                setValues({ ...values, resturants: data.resturants })
            }).catch(err => console.log(err))
    }, [])

    

    const handleChange = (e)=> {
      console.log(e.target.checked)
      setCheck(e.target.checked);
      if(e.target.checked){
        getResturantsbyType('v')
        .then(data => {
            console.log(data);
            if (data.error) {
                setVeg({ ...veg, error: data.error })
            }
            setVeg({ ...veg, resturants: data })
        })
    }
    }

  
    return (
        <React.Fragment>
            {console.log(veg)}
            {/* {fetchVegRest()} */}
            <Nav />
            <div className="container-fluid">
                    <div>
                        <label className="switch">
                            <input type="checkbox" id='a' onChange={handleChange}></input>
                            <span className="slider"></span>
                            <p className="off"></p>
                            <p className="on">Veg</p>
                        </label>
                    </div>
                </div>
            <div className='home_card_container'>
              
                {!check? values.resturants.map(resturant => {
                    return <Card key={resturant._id} resturant={resturant} />
                }): veg.resturants.map(resturant => {
                    return <Card key={resturant._id} resturant={resturant} />
                })}
            </div>

        </React.Fragment>
    )
}
export default Home;