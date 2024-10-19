import {React, useState, useEffect} from 'react'
import { Header, Footer, SimpleStatistics, Product } from '../../Components'
import useMainStatistics from '../../hooks/useMainStatistics'
import './Home.css'
import usePackages from '../../hooks/usePackages'

const Home = ({isHome}) => {
    const {mainStatistics} = useMainStatistics()
    const {allPackages} = usePackages()
    const [filteredPackages, setFilteredPackages] = useState([])
    const [hasFilteredPackages, setHasFilteredPackages] = useState('pending')


    const filterPackagesPopularity = (popularityValue) => {              
        const newPacks =  allPackages.filter(({popularity}) => popularity === popularityValue)
        return newPacks
    }

    const handleSearchResults = (packages) => {
        setFilteredPackages(packages)
        if (packages.length > 0) {
            setHasFilteredPackages('yes')
            
        }else{
            setHasFilteredPackages('no')
        }

    }

    const popularPackages = filterPackagesPopularity('Alta')

    return (
        <>
            <Header isHome={isHome} packages={allPackages} onSearch={handleSearchResults}/>
            <main className='main-container'>
                {
                    hasFilteredPackages != 'pending' && (
                        hasFilteredPackages == 'no'
                        ? 
                            <div className='search-no-result'>
                                <div className='sec-title'>
                                    <h3 className='title'>Destinos encontrados...</h3>
                                </div>
                                <span className='no-result'>No se encontraron resultados para la búsqueda</span>
                            </div>
                        :
                            hasFilteredPackages == 'yes' && (
                                <section className='search-results'>
                                    <div className='sec-title'>
                                        <h3 className='title'>Destinos encontrados...</h3>
                                    </div>
                                    <div className='content'>
                                        {filteredPackages.map(({id, imgSrc, destTitle, location, grade, fees, description}) => (
                                            <Product key={id} id={id} imgSrc={imgSrc} destTitle={destTitle} location={location} grade={grade} fees={fees} description={description} />
                                        ))}
                                    </div>
                                </section>
                            )
                    )
                }
                <section className='travelers-point'>
                    <div className='img-travelers'>
                        <img src='src\assets\viajeros.jpeg' alt='Viajeros' />
                    </div>
                    <div className='info-travelers'>
                        <h3 className='travelers-title'>Rutas soñadas</h3>
                        <span className='travelers-subtitle'>Te ayudamos a encontrar tu destino soñado</span>
                        <p className='travelers-text'>'En nuestra agencia de viajes, entendemos que cada viaje es único. Nos especializamos en crear experiencias personalizadas, buscando el destino que mejor se adapte a tus deseos y necesidades. Desde la planificación hasta el último detalle, te acompañamos para que tus vacaciones sean relajantes, emocionantes y completamente inolvidables.'</p>
                        <div className='travelers-statistics'>
                            {
                                mainStatistics.map(statistic => {
                                    return (
                                        <SimpleStatistics key={statistic.id} statisticTitle={statistic.title} statisticNumber={statistic['data-value']}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                <section className='popular-destination'>
                    <div className='sec-title'>
                        <h3 className='title'>
                            Destinos populares
                        </h3>
                    </div>
                    <div className='content'>
                        {
                            popularPackages.map(({id, imgSrc, destTitle, location, grade, fees, description}) => {
                                return (
                                    <Product key={id} id={id} imgSrc={imgSrc} destTitle={destTitle} location={location} grade={grade} fees={fees} description={description}/>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home
