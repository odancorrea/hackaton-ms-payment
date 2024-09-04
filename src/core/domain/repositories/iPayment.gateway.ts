export default interface IPaymentGateway {
  pay(data: any): boolean
}