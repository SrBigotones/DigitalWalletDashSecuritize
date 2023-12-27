import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from 'src/wallets/schemas/wallet.schema';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule ,MongooseModule.forFeature([{name: Wallet.name, schema: WalletSchema}])],
  controllers: [WalletsController],
  providers: [WalletsService, EtherscanService]
})
export class WalletsModule {}
