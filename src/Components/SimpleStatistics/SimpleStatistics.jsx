import React from 'react'
import './SimpleStatistics.css'

const SimpleStatistics = ({statisticNumber, statisticTitle}) => {
  return (
    <div className='statistics'>
        <span className='statistics-number'>{statisticNumber}</span>
        <span className='statistics-title'>{statisticTitle}</span>
    </div>
  )
}

export default SimpleStatistics