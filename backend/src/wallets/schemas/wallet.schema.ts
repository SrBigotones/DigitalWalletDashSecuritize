import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type WalletDocument = HydratedDocument<Wallet>;


@Schema()
export class Wallet{
    @Prop({type: String, required: true})
    address: string;
    @Prop({type: Boolean, required: false})
    favorite: boolean = false
}


export const WalletSchema = SchemaFactory.createForClass(Wallet);