export class NumberHelper {

  static GROUP_SEPARATOR = String.fromCharCode(parseInt('a0', 16));

  static formatWithCurrency(value: number, currency: string): string {
    return Intl.NumberFormat('pl', { style: 'currency', currency: currency, currencyDisplay: 'code' })
      .format(value)
      .replace(/(\d+)(\d{3})/g, '$1' + this.GROUP_SEPARATOR + '$2');
  }

}
