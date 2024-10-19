import { useEffect, useState } from "react"
import solicitarEstadisticasPrincipales from "../fetching/mainStatisticsFetching"

const useMainStatistics = () => {
    const [mainStatistics, setMainStatistics] = useState([])

    const getMainStatistics = async () => {
        const mainStatistics = await solicitarEstadisticasPrincipales()
        setMainStatistics(mainStatistics)
    }

    useEffect(() => {
        getMainStatistics()
    }, [])
    
    return {
        mainStatistics: mainStatistics
    }
}

export default useMainStatistics