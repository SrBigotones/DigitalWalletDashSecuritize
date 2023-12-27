import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from 'src/wallets/schemas/wallet.schema';
import { AddWalletDTO } from './dto/add-wallet.dto';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { UpdateWalletDTO } from './dto/update-wallet.dto';
import { ViewWalletDTO } from './dto/view-wallet.dto';

@Injectable()
export class WalletsService {
    constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>,
        private etherscan: EtherscanService){}

    async add(createWalletDto: AddWalletDTO): Promise<Wallet>{
        const createdWallet = new this.walletModel(createWalletDto)
        return createdWallet.save()
    }

    async updateFavorite(updateWallet: UpdateWalletDTO){
       
        let query = await this.walletModel.findOne({address: updateWallet.address})
        if(query){
            await this.walletModel.findOneAndUpdate({address: updateWallet.address}, updateWallet)
            return
        }else{
            throw new HttpException('Object not found', HttpStatus.BAD_REQUEST)
        }
    }


    async findAll(): Promise<ViewWalletDTO[]>{
        let query = await this.walletModel.find().exec()
        return Promise.all(query.map(async res => this.findWalletByAddress(res.address)))
    }

    async findWalletByAddress(walletAddress: String){
        return await this.findOneWallet(walletAddress)
            .then(async res => {
                let walletInfo = await this.etherscan.getWalletInfo(res.address)
                walletInfo = {
                    ...walletInfo,
                    favorite: res.favorite
                }
                return walletInfo
            })
    }

    private async findOneWallet(walletAddress: String){
        return await this.walletModel.findOne({address: walletAddress})
    }
}
