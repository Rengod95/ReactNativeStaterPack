import {parse} from 'node-html-parser';
import API from '../../outbound/api/requests/adapter.ts';

/** @example 'USD' | 'EUR' */
export type ExchangeSymbol = string;
export interface ExchangeRate {
  symbol: string;
  currentPrice: number;
  previousDayComparison: number;
  rateOfChange: number;
}

const urls = [
  'https://finance.naver.com/marketindex/worldExchangeList.naver?key=exchange&page=1',
  'https://finance.naver.com/marketindex/worldExchangeList.naver?key=exchange&page=2',
  'https://finance.naver.com/marketindex/worldExchangeList.naver?key=exchange&page=3',
  'https://finance.naver.com/marketindex/worldExchangeList.naver?key=exchange&page=4',
];

export class ExchangeRateCrawlingService {
  public static fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    const exchangeRates: ExchangeRate[] = [];

    for (const url of urls) {
      const response = await API.Get(url);
      const root = parse(response.data);
      const rows = root.querySelectorAll('table.tbl_exchange tbody tr');

      rows.forEach(row => {
        const symbol = row.querySelector('td.symbol')?.text.trim() || '';
        const tds = row.querySelectorAll('td');

        if (tds.length >= 5) {
          const currentPrice = parseFloat(tds[2].text.trim().replace(',', '').replace('%', ''));
          const previousDayComparison = parseFloat(tds[3].text.trim().replace(',', '').replace('%', ''));
          const rateOfChange = parseFloat(
            tds[4].text
              .trim()
              .replace(',', '')
              .replace('%', '')
              .replace(/[^\d.-]/g, ''),
          );

          exchangeRates.push({
            symbol,
            currentPrice,
            previousDayComparison,
            rateOfChange,
          });
        }
      });
    }

    return exchangeRates;
  };

  public static extractSymbol(exchangeRates: ExchangeRate[]): ExchangeSymbol[] {
    const extractedWithoutUSD = exchangeRates.map(rate => {
      return rate.symbol.replace('USD', '');
    });

    extractedWithoutUSD.push('USD');

    return extractedWithoutUSD as ExchangeSymbol[];
  }
}
