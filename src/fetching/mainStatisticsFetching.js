const solicitarEstadisticasPrincipales = async () => {
    const URL_API_MAIN_STATISTICS = 'https://ruta-latina.vercel.app/data/main-statistics.json'

    const responseHttp = await fetch(URL_API_MAIN_STATISTICS,
        {
            method: 'GET'
        }
    )
    const result = await responseHttp.json()
    return result
}

export default solicitarEstadisticasPrincipales