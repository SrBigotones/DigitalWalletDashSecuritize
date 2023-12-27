import axios from "axios";
import { Wallet } from "../interfaces/Wallet";
import { ExchangeRate } from "../interfaces/ExchangeRate";

const API_URL = 'http://localhost:3001'

export class API{
    private static instance: API;

    private constructor(){}


    public static getInstance(){
        if(this.instance == null){
            this.instance = new API()
        }

        return this.instance
    }

    public async getWallets(): Promise<Wallet[]>{
         
        let dat =(await axios.get(`${API_URL}/wallets/find`)).data
        return dat
    }



    public async updateWallet(wallet: Wallet){
        let dat = (await axios.put(`${API_URL}/wallets`, wallet))
        if(dat){
            return {
                ...wallet,
                favorite: !wallet.favorite
            }
        }
    }


    public async addWallet(walletAddress: String){
        let response = (await axios.post(`${API_URL}/wallets`, {address: walletAddress}))
        if(response.status == 200){
            return response.data
        }
    }

    public async fetchExchangeRate(): Promise<ExchangeRate[]> {
        let response = await axios.get(`${API_URL}/exchange`)
        if(response.status == 200)
            return response.data

        throw new Error()
    }

}