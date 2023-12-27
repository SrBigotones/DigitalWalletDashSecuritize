import { Wallet } from "../interfaces/Wallet"
import { CurrencyDisplay } from "./CurrencyDisplay"
import { InfoDisplay } from "./InfoDisplay"

export const WalletView = (params: {wallet: Wallet}) => {
    return <div className="flex flex-col mt-4">
        {params.wallet.age > 1 ? 
            <div className="bg-red-200 w-auto text-center mx-auto rounded-lg">
                <p>⚠️The wallet is old!</p>
            </div>
        :<></>}
        
        <div className="flex flex-row justify-center mt-4">
            <InfoDisplay wallet={params.wallet}/>
            <CurrencyDisplay wallet={params.wallet}/>
        </div>
    </div>
}