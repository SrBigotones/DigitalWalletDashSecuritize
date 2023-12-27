import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { fetchAddWallet } from "../store/walletSlice"
import { useState } from "react"

export const AddWallet = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const [newAddress, setNewAddress] = useState('')

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress(e.target.value)
    }

    const handleAddWallet = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(fetchAddWallet(newAddress))
        setNewAddress('')
    }

    return <div>
        <p>
            <input value={newAddress} onChange={handleChangeAddress} type="text" className="border-gray-300 border-2 rounded-md mx-3"></input>
            <button className="border-black bg-blue-400 hover:bg-blue-700 ease-out duration-200 rounded-md p-1" onClick={handleAddWallet}>Add Wallet</button>
        </p>
    </div>
}