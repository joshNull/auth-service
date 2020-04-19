import { useContext } from 'react'
import { AppContext } from '../../context'

function useContextHelper(context = AppContext) {
    const [state, setState] = useContext(context)
    return [state, setState]
}

export default useContextHelper