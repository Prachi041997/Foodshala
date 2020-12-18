import React from 'react';
import './ContainerImage.css'
const ContainerImage = ({img}) => {
    return <div className='containerImage'>
        <img src={img}></img>
    </div>
}

export default ContainerImage;