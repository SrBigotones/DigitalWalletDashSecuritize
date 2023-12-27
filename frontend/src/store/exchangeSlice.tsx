import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ExchangeRate } from "../interfaces/ExchangeRate"
import { API } from "../api/api"

const api = API.getInstance()
const initialStateExchangeRate = {
    USD: 1.2,
    EUR: 1.3
}

export const fetchExchangeRate = createAsyncThunk('exchange/fetchExchangeRate',
    async () => {
        return (await api.fetchExchangeRate())
    }
)

const exchangeSlice = createSlice({
    name: "exchangeRates",
    initialState: initialStateExchangeRate,
    reducers:{
        updateExchange(state, action: PayloadAction<ExchangeRate>){
            if(action.payload.name === 'USD'){
                state.USD = action.payload.value
            }else{
                state.EUR = action.payload.value
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExchangeRate.pending, (state) => {

        })
        builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
            return {
                USD: action.payload.find(x => x.name === 'USD')!.value,
                EUR: action.payload.find(x => x.name === 'EUR')!.value
            }
        })
    }

})

export const {updateExchange} = exchangeSlice.actions
export default exchangeSlice.reducer