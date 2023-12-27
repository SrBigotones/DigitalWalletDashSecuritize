import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Wallet } from "../interfaces/Wallet";
import { API } from "../api/api";




const api = API.getInstance()
const initialStateWallet = [
    {
        address: '0xe365124928a626941071be705150555f6807a5b4',
        age: 2,
        balance: 123,
        favorite: true
    },
    {
        address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
        age: 1,
        balance: 314273.44533578906,
        favorite: false
    },
    {
        address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697be',
        age: 0,
        balance: 314273.44533578906,
        favorite: true
    },
] as Wallet[]



const initialStateWalletAPI = {
    isLoading: false,
    collection: [] as Wallet[]
}
// const initialStateWalletAPI: Wallet[] = []


export const fetchWallets = createAsyncThunk('wallets/fetchWallets', 
    async () => {
        return (await api.getWallets())
    }
)

export const updateWallet = createAsyncThunk('wallets/updateWallet',
    async (wallet: Wallet) => {
        return (await api.updateWallet(wallet))
    }
)

export const fetchAddWallet =  createAsyncThunk('wallets/addWallet', 
    async(walletAddress: String) => {
        return (await api.addWallet(walletAddress))
    }
)

const walletSlice = createSlice({
    name: "wallets",
    initialState: initialStateWalletAPI,
    reducers: {
        addWallet(state, action: PayloadAction<Wallet>){
            state.collection.push(action.payload)
        },
        editWallet(state, action: PayloadAction<Wallet>){
            // updateWallet(action.payload)
            state.collection.find(x => x.address === action.payload.address)!.favorite = action.payload.favorite
        },
        sortWallets(state){
            state.collection = state.collection.sort((a,b) => !a.favorite ? 1 : -1)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWallets.pending, (state)=> {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchWallets.fulfilled, (_state, action) => {
            return {
                isLoading: false,
                collection: action.payload
            }
        })
        builder.addCase(updateWallet.pending, (state)=> {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(updateWallet.fulfilled, (state, action) => {
            
            let tempCollection = state.collection.map(x => x.address === action.payload!.address ? {...x, favorite: !x.favorite} : x)
            console.log(tempCollection)
            return {
                isLoading: false,
                collection: tempCollection
            }
        })
        builder.addCase(fetchAddWallet.pending, (state) => {
            return{
                ...state,
                isLoading: true
            }
        })
        builder.addCase(fetchAddWallet.fulfilled, (state, action) => {
            state.collection.push(action.payload)
            return {
                ...state,
                isLoading: false,
            }
        })
    }
})





export const {addWallet, editWallet, sortWallets} = walletSlice.actions
export default walletSlice.reducer
