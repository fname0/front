import React from 'react';
import img from '../assets/img.jpg'


const View = () => {
    return(
        <div className='View' onClick={e=>e.stopPropagation()}>
            <img src={img} alt='Зал'/>
        </div>
    );
};

export default View