import { useContext, useReducer, useEffect, useState } from 'react'
import { AppContext } from '../../context'
import { appReducer } from '../../reducer'

function useSendRequest({ endpoint, method, body = {} }) {
    const [app, setApp] = useContext(AppContext)
    const [draft, dispatch] = useReducer(appReducer, app)
    const [loader, setLoader] = useState(false)
    const [result, setResult] = useState({ data: [], message: "" })

    useEffect(() => { setApp(draft) }, [draft])

    useEffect(() => {

        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }

        if (["POST", "PATCH"].indexOf(method) !== -1) {
            options.body = JSON.stringify(body)
        }

        setLoader(true)

        fetch(app.env.api_url + endpoint, options)
            .then(async (response) => {
                if (response.ok) {
                    const { data, message } = await response.json()
                    if (successful) {
                        setResult({ data, message })
                        setLoader(false)
                        // callback({ data, message })
                    } else {
                        throw { statusCode: response.status, message: message }
                    }
                } else {
                    throw { statusCode: response.status, message: response.statusText }
                }
            })
            .catch(error => {
                setLoader(false)
                dispatch({ type: "setError", payload: { statusCode: error.statusCode, message: error.message || "An error has occured" } })
            })
    }, [])

    // {loader, data, message}
    return { loader, ...result }
}

export default useSendRequest