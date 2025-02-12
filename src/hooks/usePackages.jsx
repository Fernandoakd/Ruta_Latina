import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ENVIROMENT from "../utils/constants/enviroment";

const usePackages = () => {
    const { loading, data, error, callFetch } = useFetch(
        `${ENVIROMENT.API_URL}/api/packages`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        },
        [],
        false
    );

    const [packages, setPackages] = useState([]);
    const [allPackages, setAllPackages] = useState([]);
    const [packagesZone, setPackagesZone] = useState([]);

    useEffect(() => {
        callFetch();
    }, []);

    useEffect(() => {
        if (data && data.ok) {
            const fetchedPackages = data.data;
            setPackages(fetchedPackages);
            setAllPackages(fetchedPackages);

            const menuPackages = [...new Set(fetchedPackages.map((pack) => pack.zone))];
            setPackagesZone(menuPackages);
        }
    }, [data]);

    const filterPackagesZone = (zoneValue) => {            
        const newPacks = allPackages.filter(({ zone }) => zone === zoneValue);
        setPackages(newPacks);
    };

    return {
        packages,
        filterPackagesZone,
        getPackages: callFetch,
        packagesZone,
        allPackages,
        loading,
        error
    };
};

export default usePackages;
