import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsModule } from './wallets/wallets.module';
import { EtherscanService } from './etherscan/etherscan.service';
import { HttpModule } from '@nestjs/axios';
import { EtherscanController } from './etherscan/etherscan.controller';

@Module({
  imports: [HttpModule,MongooseModule.forRoot('mongodb://localhost:27017/wallet'), WalletsModule],
  controllers: [AppController, EtherscanController],
  providers: [AppService, EtherscanService],
})
export class AppModule {}
