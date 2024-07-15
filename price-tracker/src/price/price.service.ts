import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Price, PriceDocument } from './schemas/price.schema';

@Injectable()
export class PriceService {
    private readonly logger = new Logger(PriceService.name);
    private readonly apiUrl: string;

    constructor(
        @InjectModel(Price.name) private readonly priceModel: Model<PriceDocument>,
        private readonly configService: ConfigService,
    ) {
        this.apiUrl = this.configService.get<string>('API_URL');
        this.scheduleCronJob();
    }

    private async fetchAndStorePriceData() {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    ids: 'bitcoin,ethereum,tether,solana', // Add other stocks/cryptos here
                    vs_currencies: 'usd',
                },
            });

            const prices = response.data;
            const timestamp = new Date();

            const priceEntries = Object.keys(prices).map((key) => ({
                name: key,
                price: prices[key].usd,
                timestamp,
            }));

            await this.priceModel.insertMany(priceEntries);
            this.logger.debug('Fetched and stored price data');
        } catch (error) {
            this.logger.error('Error fetching price data', error);
        }
    }

    @Cron('*/15 * * * * *')
    private scheduleCronJob() {
        this.fetchAndStorePriceData();
    }

    async findPricesByName(name: string): Promise<PriceDocument[]> {
        try {
            return await this.priceModel
                .find({ name })
                .sort({ timestamp: -1 })
                .limit(20)
                .exec();
        } catch (error) {
            this.logger.error(`Error fetching prices for ${name}`, error);
            throw error;
        }
    }
}
