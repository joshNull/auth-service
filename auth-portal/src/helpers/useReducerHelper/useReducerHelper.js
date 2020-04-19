import { useContext, useReducer } from 'react'
import { AppContext } from '../../context'
import { appReducer } from '../../reducer'

function useReducerHelper(context = AppContext, reducer = appReducer) {
    const [state, setState] = useContext(context)
    const [draft, dispatch] = useReducer(reducer, state)

    return [draft, dispatch]
}

export default useReducerHelper