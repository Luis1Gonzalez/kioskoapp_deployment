import { useContext } from 'react'
import KioskoContext from '../context/kioskoProvider'

const useKiosko = () => {
    return useContext(KioskoContext)
}
export default useKiosko