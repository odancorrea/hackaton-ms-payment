export default interface iPaymentUseCases {
  create(paymentInfo: any): Promise<boolean>,
  readById(id: number): Promise<any>,
  read(): Promise<any>,
  update(id: number, paymentInfo: any): Promise<boolean>,
  delete(id: number): Promise<boolean>
}