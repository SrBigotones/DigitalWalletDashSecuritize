import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EtherscanController } from './etherscan.controller';
import { EtherscanService } from './etherscan.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), HttpModule],
    controllers: [EtherscanController],
    providers: [EtherscanService]
})
export class EtherscanModule {}
