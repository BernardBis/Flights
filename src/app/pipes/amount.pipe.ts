import { Pipe, PipeTransform } from '@angular/core';
import { Amount } from '../model/amount';
import { NumberHelper } from '../utils/number.helper';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(amount: Amount, ...args: any[]) {
    if (amount == null || amount === undefined) {
      return '';
    }
    return NumberHelper.formatWithCurrency(amount.value, amount.currency.symbol);
  }

}
