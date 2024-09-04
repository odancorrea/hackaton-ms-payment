import { Payment } from "../entities/payment";

export default interface IBuyerRepository {
    create(paymentInfo: any): Promise<boolean>,
    readById(id: number): Promise<Payment | false>,
    read(): Promise<Payment[] | false>,
    update(payment: Payment): Promise<boolean>,
    delete(id: Payment): Promise<boolean>,
    readByCode(code: string): Promise<Payment | false>,
}