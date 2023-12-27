import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { updateExchange } from "../store/exchangeSlice"

export const EditCurrentRate = () => {
    const dispatch = useDispatch<AppDispatch>()
    const exchangeList = useSelector((state: RootState) => state.exchangeReducer)


    const handleChangeExchangeRate = (e: React.ChangeEvent<HTMLInputElement>, currency: String) =>{
        dispatch(updateExchange({
            name: currency,
            value: Number(e.target.value)
        }))
    }

    return <div className="relative bg-gray-200 p-8 max-w-md mx-4  rounded-md text-xs">
        <p className="absolute top-0 right-0 p-2 text-gray-600 hover:text-red-500">
            📝
        </p>
        Current rates:
        <div className="text-center">
            <p>
                <label htmlFor="usdTf">USD:</label>
                <input type="text" className="rounded-lg" value={exchangeList.USD} onChange={(e) =>handleChangeExchangeRate(e, 'USD')}></input>
            </p>
            <p>
                <label htmlFor="usdTf">EUR:</label>
                <input type="text" className="rounded-lg" value={exchangeList.EUR} onChange={(e) =>handleChangeExchangeRate(e, 'EUR')}></input>
            </p>
            
        </div>
    </div>

}