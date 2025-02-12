import { useEffect, useState } from "react";

export const useFetch = (api_url, params = {}, dependencies = [], autoFetch = true) => {
    const [loading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const callFetch = async (overrideUrl = api_url, overrideParams = params) => {
        setIsLoading(true);
        try {
            const response = await fetch(overrideUrl, overrideParams);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            callFetch();
        }
    }, dependencies);

    return { loading, data, error, callFetch };
};
