import React from 'react';
import { Header, Footer, ButtonsFilter, Product } from '../../Components';
import './Packages.css';
import usePackages from '../../hooks/usePackages';

const Packages = () => {
    const { packages, filterPackagesZone, getPackages, packagesZone, loading, error } = usePackages();

    return (
        <>
            <Header />
            <main className='packages-main-container'>
                <div className='packages-section'>
                    <img src='/assets/package-section.jpg' alt='Paquetes' className='img-packages-section' />
                    <div className='packages-section-info'>
                        <h2 className='title-packages-section'>Paquetes</h2>
                    </div>
                </div>
                <section className='packs-filter-container'>
                    <div className='subtitle-section'>
                        <h3>Encontrá los mejores paquetes</h3>
                        <span>Y disfrutá tus merecidas vacaciones</span>
                    </div>
                    <ButtonsFilter
                        menuPackages={packagesZone}
                        filterPackages={filterPackagesZone}
                        getPackages={getPackages}
                    />
                    <div className='content'>
                        {loading ? (
                            <p className='loading-message'>Cargando paquetes...</p>
                        ) : error ? (
                            <p className='error-message'>Error al cargar paquetes. Inténtalo de nuevo.</p>
                        ) : (
                            packages.map(({ _id, package_img, destTitle, location, grade, fees }) => (
                                <Product key={_id} id={_id} package_img={package_img} destTitle={destTitle} location={location} grade={grade} fees={fees} />
                            ))
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Packages;
