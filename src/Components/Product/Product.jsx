import React from 'react'
import './Product.css'
import { BorderLocationIcon } from '../../Icons'
import { Link } from 'react-router-dom'

const Product = ({id, imgSrc, destTitle, location, grade, fees}) => {
  return (
    <div className='single-package'>
        <div className='package-image'>
            <img src={`../../../src/assets/${imgSrc}`} alt={destTitle} />
        </div>
        <div className='package-info'>
            <h4 className='package-title'>{destTitle}</h4>
            <span className='package-country'>
                <BorderLocationIcon className='icon'/>
                <span className='country-name'>{location}</span>
            </span>
            <div className='fees'>
                <div className='grade'>
                    <span>{grade}</span>
                </div>
                <div className='price'>
                    <h5>${fees}</h5>
                </div>
            </div>
            <Link to={`/packages/${id}`} className='btn'>
                Más detalles
            </Link>
        </div>
    </div>
  )
}

export default Product