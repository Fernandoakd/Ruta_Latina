const solicitarPaquetes = async () => {
    const URL_API_PACKAGES = 'https://ruta-latina.vercel.app/data/packages.json'

    const responseHttp = await fetch(URL_API_PACKAGES,
        {
            method: 'GET'
        }
    )
    const result = await responseHttp.json()
    return result
}

export default solicitarPaquetes