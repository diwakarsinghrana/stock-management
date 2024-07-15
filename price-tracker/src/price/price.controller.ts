import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('prices')
export class PriceController {
    constructor(private readonly priceService: PriceService) { }

    @Get()
    async getPrices(@Query('name') name: string) {
        return this.priceService.findPricesByName(name);
    }
}
