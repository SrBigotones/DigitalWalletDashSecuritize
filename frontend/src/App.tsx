
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store/store"
import { WalletView } from "./components/WalletView"
import { AddWallet } from "./components/AddWallet"
import { fetchWallets, sortWallets } from "./store/walletSlice"
import { useEffect } from "react"
import { EditCurrentRate } from "./components/EditCurrentRate"
import { fetchExchangeRate } from "./store/exchangeSlice"

function App() {

  
  const walletList = useSelector((state: RootState) => state.walletReducer)
  const dispatch = useDispatch<AppDispatch>()

  const handleSortWallets = () => {
    dispatch(sortWallets())
  }

  useEffect(() => {
    dispatch(fetchWallets())  
    dispatch(fetchExchangeRate())
  }, [])

  return (
    <div className="flex flex-col text-center">
      <AddWallet/>
      <div className="flex flex-row">
        <button className="w-32 p-2 bg-gray-300 hover:bg-slate-300 duration-200 rounded-lg" onClick={handleSortWallets}>Sort by favorite ⬆️</button>
        <EditCurrentRate/>
      </div>
      {walletList.collection
        .map((wallet, idx) => <WalletView key={idx} wallet={wallet}/>)
        }
    </div>
  )
}

export default App

