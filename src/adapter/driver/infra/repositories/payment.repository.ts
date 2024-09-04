import { Payment } from "../../../../core/domain/entities/payment";
import IPaymentRepository from "../../../../core/domain/repositories/iPayment.repository";
import dataSource from "../data-source";

class PaymentRepository implements IPaymentRepository{
    async create(payment: any): Promise<boolean> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            await paymentRepository.save(payment)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async readById(id: number): Promise<Payment | false> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            return await paymentRepository.findOneBy( { id: id } )  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async readByCode(code: string): Promise<Payment | false> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            return await paymentRepository.findOneBy( { code: code } )  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async read(): Promise<Payment[] | false> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            return await paymentRepository.find()  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async update(payment: Payment): Promise<boolean> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            await paymentRepository.save(payment)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async delete(payment: Payment): Promise<boolean> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            await paymentRepository.delete(payment)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default PaymentRepository