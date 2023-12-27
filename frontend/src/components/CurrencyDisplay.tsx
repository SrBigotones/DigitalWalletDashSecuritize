import {useState } from "react"
import { Wallet } from "../interfaces/Wallet"
import { RootState } from "../store/store"
import { useSelector } from "react-redux"

export const CurrencyDisplay = (params: {wallet: Wallet}) => {
    const exchangeList = useSelector((state: RootState) => state.exchangeReducer)
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')



    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    return <div className="relative bg-gray-200 p-8 max-w-md mx-4  rounded-md">
        

        <div className="text-center">
            <select onChange={handleCurrencyChange} className="rounded-md"> 
                <option value={"USD"}>USD</option>
                <option value={"EUR"}>EUR</option>
            </select>
            {selectedCurrency === 'USD' ?
                <p>{`$ ${params.wallet.balance * exchangeList.USD}`}</p>
            :
                <p>{`€ ${params.wallet.balance * exchangeList.EUR}`}</p> 
            }
            
        </div>
    </div>
}