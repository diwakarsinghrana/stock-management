import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceService } from './price.service';
import { Price, PriceSchema } from './schemas/price.schema';
import { PriceController } from './price.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
    ],
    providers: [PriceService],
    controllers: [PriceController],
})
export class PriceModule { }