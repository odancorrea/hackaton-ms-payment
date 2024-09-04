import { Payment } from "../../domain/entities/payment";
import IHash from "../../domain/repositories/iHash";
import IHttp from "../../domain/repositories/iHttp";
import IPaymentGateway from "../../domain/repositories/iPayment.gateway";
import IPaymentQueue from "../../domain/repositories/iPayment.queue";
import IPaymentRepository from "../../domain/repositories/iPayment.repository";
import iPaymentUseCases from "./iPayment.use-cases";

class PaymentUseCases implements iPaymentUseCases {
    constructor (
        private paymentRepository: IPaymentRepository,
        private queue: IPaymentQueue,
        private http: IHttp,
        private hash: IHash,
        private paymentGateway: IPaymentGateway
    ) {}

    async create(paymentInfo: any): Promise<boolean> {
        try {
            const code = this.hash.generate()
            const payment = new Payment(paymentInfo.id, Payment.SALE_STATUS_START, code)
            await this.paymentRepository.create(payment)
            await this.http.put(`${process.env.SALES_MS}/sale/${paymentInfo.id}`, { payment_code: code })
            return true
        } catch (error: any) {
            console.log(error.message)
            return false
        }
    }

    async readById(id: number): Promise<any> {
        return await this.paymentRepository.readById(id)
    }

    async readByCode(code: string): Promise<any> {
        return await this.paymentRepository.readByCode(code)
    }

    async read(): Promise<any> {
        return await this.paymentRepository.read()
    }

    async update(id: number, paymentInfo: any): Promise<boolean> {
        let payment = await this.paymentRepository.readById(id)
        if (payment) {
            await this.paymentRepository.update(Object.assign(payment, paymentInfo))
            return true
        }

        return false
    }

    async delete(id: number): Promise<boolean> {
        let payment = await this.paymentRepository.readById(id)
        if (payment) {
            await this.paymentRepository.delete(payment)
            return true
        }

        return false
    }

    async pay(paymentInfo: any): Promise<boolean> {
        let payment = await this.paymentRepository.readByCode(paymentInfo.code)
        if (payment) {
            if (this.paymentGateway.pay(paymentInfo)) {
                await this.paymentRepository.update(Object.assign(payment, { status: Payment.SALE_STATUS_PAID }))
                this.queue.sendToQueue(JSON.stringify(paymentInfo), process.env.PAYMENT_APPROVED || 'pagamento_aprovado')
                return true
            } else {
                await this.paymentRepository.update(Object.assign(payment, { status: Payment.SALE_STATUS_REFUSED }))
                this.queue.sendToQueue(JSON.stringify(paymentInfo), process.env.PAYMENT_ERROR || 'pagamento_erro')
                return false
            }
        }

        return false
    }
}

export default PaymentUseCases