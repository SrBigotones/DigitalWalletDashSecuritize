import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { ViewWalletDTO } from 'src/wallets/dto/view-wallet.dto';
import { ExchangeRate, PriceDTO } from './dto/price.dto';


const ETH_WEI = Math.pow(10, -18)
const currentYear = new Date().getFullYear()
@Injectable()
export class EtherscanService {
    private API_URL = process.env.API_URL
    private API_KEY = process.env.API_KEY //

    constructor(private readonly httpService: HttpService){}

    async getWalletBalance(walletAddress: String): Promise<Number>{
        let urlReq = `${this.API_URL}api?module=account&action=balance&address=${walletAddress}&apikey=${this.API_KEY}`
        let response = await firstValueFrom(
            this.httpService.get(urlReq)
                .pipe(map(res => res.data))
        ) 
        console.log(response)
        return Number(response.result * ETH_WEI)
    }

    async getWalletAge(walletAddress: String): Promise<Number>{

        let urlReq = `${this.API_URL}api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${this.API_KEY}`
        let response = await firstValueFrom(
            this.httpService.get(urlReq)
                .pipe(map(res => res.data))
        )
        if(response.result && response.length){
            let epoch = Number(response.result[0].timeStamp)
            console.log(epoch)
            return  currentYear - new Date(epoch * 1000).getFullYear()
        }

        return 0
    }



    async getWalletInfo(walletAddress: String): Promise<ViewWalletDTO>{

        let viewWallet : ViewWalletDTO = {
            address: walletAddress,
            age: await this.getWalletAge(walletAddress),
            balance: await this.getWalletBalance(walletAddress),
            favorite: false
        }

        return viewWallet
    }


    async getPrice(): Promise<any>{

        let urlReq = `${this.API_URL}api?module=stats&action=ethprice&apikey=${this.API_KEY}`
        let response = await firstValueFrom(
            this.httpService.get(urlReq).pipe(map(res => res.data))
        )
        if(response.result){
            let body: PriceDTO = {
                ethusd: response.result.ethusd
            }
            return body
        }
        throw new HttpException('Could not request info', HttpStatus.BAD_GATEWAY) 
    }


    async getFixedExchange(){
        console.log(this.API_URL)
        let exchanges: ExchangeRate[] = [{
            name:'USD',
            value: 66
        },{
            name:'EUR',
            value: 99
        }]
        return exchanges
    }
}
