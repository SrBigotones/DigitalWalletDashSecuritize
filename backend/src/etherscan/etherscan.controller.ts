import { Controller, Get } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';

@Controller('exchange')
export class EtherscanController {
    constructor(private readonly etherscanService: EtherscanService){}

    @Get()
    public async getPrice(){
        return await this.etherscanService.getFixedExchange()
    }
}
