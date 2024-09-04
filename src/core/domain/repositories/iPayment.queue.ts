export default interface IPaymentQueue {
  sendToQueue(message: string, queue: string): void
  ack (message: any): void
  nack (message: any): void
}