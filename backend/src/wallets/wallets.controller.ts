import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { AddWalletDTO } from './dto/add-wallet.dto';
import { UpdateWalletDTO } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletService: WalletsService){}


    @Post()
    async addWallet(@Body() addWallet: AddWalletDTO){
        await this.walletService.add(addWallet)
    }


    @Get('find/:walletAddress')
    async findOneWallet(@Param() params : any){
        return this.walletService.findWalletByAddress(params.walletAddress)
        

    }

    @Get('find')
    async findWallets(){
        return this.walletService.findAll()
    }

    @Put()
    async updateFavorite(@Body() walletUpdate: UpdateWalletDTO){
        return this.walletService.updateFavorite(walletUpdate)
    }
}
