import { useEffect, useState } from "react"
import solicitarPaquetes from "../fetching/packagesFetching"

const usePackages = () => {
    const [packages, setPackages] = useState([])
    const [allPackages, setAllPackages] = useState([])
    const [packagesZone, setPackagesZone] = useState([])

    const getPackages = async () => {
        const packages = await solicitarPaquetes()
        const menuPackages = [...new Set(packages.map((pack) => {
            return (
                pack.zone
            )
        }))]
        setPackagesZone(menuPackages)
        setAllPackages(packages)
        setPackages(packages)
    }

    const filterPackagesZone = (zoneValue) => {            
        const newPacks = allPackages.filter(({zone}) => zone === zoneValue)
        setPackages(newPacks)        
    }
    
    useEffect(() => {
        getPackages()
    }, [])
    
    return {
        packages: packages,
        filterPackagesZone,
        getPackages,
        packagesZone: packagesZone,
        allPackages: allPackages,
    }
}

export default usePackages