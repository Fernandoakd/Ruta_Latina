import React from 'react'
import './ButtonsFilter.css'

const ButtonsFilter = ({menuPackages, filterPackages,getPackages}) => {

  const handleFilterForZone = (event) => {
    filterPackages(event.target.value)
  }

  const handleAllPackages = (event) => {
    getPackages()
  } 

  return (
    <div className='btns-filter-container'>
      {
        menuPackages.map(val => {
          return (
            <button key={val} className='btn btn-filter-zone' value={val} onClick={handleFilterForZone}>
              {val}
            </button>
          )
        })
      }
      <button className='btn btn-filter-all' onClick={handleAllPackages}>
        Todas
      </button>
    </div>
  )
}

export default ButtonsFilter