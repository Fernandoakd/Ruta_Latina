import React, { useState, useEffect } from 'react'
import './HomeSearch.css'
import { LocationIcon, SearchIcon } from '../../Icons'

const HomeSearch = ({ packages, onSearch }) => {
  const [searchCity, setSearchCity] = useState('')
  const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0])
  const [priceRange, setPriceRange] = useState({ min: 1000, max: 5000 })
  const { minPrice, maxPrice } = getMinMaxPrices(packages)

  const handleSearch = () => {
    const filteredPackages = packages.filter(pkg => {
      const isInRange = parseInt(pkg.fees, 10) >= priceRange.min && parseInt(pkg.fees, 10) <= priceRange.max
      const matchesDestination = pkg.destTitle.toLowerCase().includes(searchCity.toLowerCase())
      return isInRange && matchesDestination
    })

    onSearch(filteredPackages)
  }

  const handleOnChangeDate = (e) => {
    setSearchDate(e.target.value)
  }

  const handleOnChangeCity = (e) => {
    setSearchCity(e.target.value)
  }

  const handleOnChangePrice = (e) => {
    setPriceRange({ ...priceRange, max: e.target.value })
  }
  
  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice })
  }, [minPrice, maxPrice])

  return (
    <div className='home-search-container'>
      <form>
        <div className='home-search-place-input'>
          <label htmlFor='city'>¿A dónde quieres viajar?</label>
          <div className='home-search-input'>
            <input
              type='text'
              placeholder='Ingrese el nombre aquí...'
              value={searchCity}
              onChange={handleOnChangeCity}
            />
            <LocationIcon className='icon' />
          </div>
        </div>
        <div className='home-search-date-input'>
          <label htmlFor='date'>Elige una fecha:</label>
          <div className='home-search-input'>
            <input
              type='date'
              value={searchDate}
              onChange={handleOnChangeDate}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <div className='home-search-price'>
          <div className='label-total'>
            <label htmlFor='price'>Ingrese un rango de precios:</label>
            <h3 className='total'>${priceRange.max}</h3>
          </div>
          <div className='home-search-input'>
            <input
              type='range'
              min={minPrice}
              max={maxPrice}
              value={priceRange.max}
              onChange={handleOnChangePrice}
            />
          </div>
        </div>
        <div className='search-button'>
          <button type='button' onClick={handleSearch}>
            <SearchIcon className='icon' />
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}

const getMinMaxPrices = (packages) => {
  const prices = packages.map(pkg => parseInt(pkg.fees, 10))
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  return { minPrice, maxPrice }
}

export default HomeSearch
