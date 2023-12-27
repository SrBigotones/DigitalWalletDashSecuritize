import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { ViewWalletDTO } from 'src/wallets/dto/view-wallet.dto';
import { PriceDTO } from './dto/price.dto';


const API_KEY = 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY'
const API_URL = 'https://api.etherscan.io/'
const ETH_WEI = Math.pow(10, -18)
@Injectable()
export class EtherscanService {

    constructor(private readonly httpService: HttpService){}

    async getWalletBalance(walletAddress: String): Promise<Number>{
        let urlReq = `${API_URL}api?module=account&action=balance&address=${walletAddress}&apikey=${API_KEY}`
        let response = await firstValueFrom(
            this.httpService.get(urlReq)
                .pipe(map(res => res.data))
        ) 
        console.log(response)
        return Number(response.result * ETH_WEI)
    }

    async getWalletAge(walletAddress: String): Promise<Date>{

        let urlReq = `${API_URL}api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${API_KEY}`
        let response = await firstValueFrom(
            this.httpService.get(urlReq)
                .pipe(map(res => res.data))
        )

        if(response.result){
            let epoch = Number(response.result[0].timeStamp)
            console.log(epoch)
            return new Date(epoch * 1000)
        }

        return 
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

        let urlReq = `${API_URL}api?module=stats&action=ethprice&apikey=${API_KEY}`
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
}
