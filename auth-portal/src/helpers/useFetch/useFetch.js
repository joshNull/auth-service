import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../context'

function useFetch(param) {

    const [{ env }, setApp] = useContext(AppContext)
    const [error, setError] = useState({ statusCode: "", message: "" })
    const [result, setResult] = useState({ successful: false, data: [], message: "" })
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        let fetchData = async ({ endpoint, method, body = {}, extraOptions }) => {
            try {

                const options = {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    ...extraOptions, 
                }

                setLoader(true)

                const request = await fetch(env.api_url + endpoint, options)

                if (request.ok) {
                    const { successful, data, message } = await request.json()
                    if (successful) {
                        setResult({ successful, data, message })
                        setLoader(false)
                    } else {
                        throw { statusCode: request.status, message: message }
                    }
                } else {
                    throw { statusCode: request.status, message: request.statusText }
                }

            } catch (error) {
                setError(error)
                setLoader(false)
            }
        }
        fetchData(param)
    }, [])

    // {loader: false, error: {statusCode: "", message: "" }, successful: true, data:[], message: ""}
    return { loader, error, ...result }
}

export default useFetch