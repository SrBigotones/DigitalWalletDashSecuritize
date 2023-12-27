import { useDispatch } from "react-redux";
import { Wallet } from "../interfaces/Wallet";
import { AppDispatch } from "../store/store";
import { editWallet, updateWallet } from "../store/walletSlice";

export const InfoDisplay = (params: {wallet: Wallet}) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleSetFavorite = () => {
        // dispatch(editWallet({...params.wallet,
        //     favorite: !params.wallet.favorite}))
        dispatch(updateWallet({
            ...params.wallet,
            favorite: !params.wallet.favorite
        }))
        
    }

    return <div className="relative bg-gray-200 p-8 mx-4  rounded-md w-auto">
        <div className="text-start">
            <p>Address: {params.wallet.address}</p>
            <p>{`ETH ${params.wallet.balance}`}</p>
            <p>
                <label htmlFor="chk">Favorite: </label>
                <input onClick={handleSetFavorite} id="chk" type="checkbox" checked={params.wallet.favorite}></input>
            </p>
        </div>
    </div>
}