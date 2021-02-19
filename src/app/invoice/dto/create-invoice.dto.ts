export class CreateInvoiceDto {
  amount: string;
  name: string;
  num: string;
  price: string;
  tax: string;
  taxRate: string;
  /**规格型号 */
  type: string;
  unit: string;
}