import IPaymentGateway from "../../../core/domain/repositories/iPayment.gateway";

export default class PaymentGateway implements IPaymentGateway {
  pay(data: any): boolean {
    return true
  }
}