import {Request, Response} from 'express'
import PaymentUseCases from '../../../core/application/use-cases/payment.use-cases'
import PaymentGateway from '../../driver/gateway/payment.gateway'
import Hash from '../../driver/hash/hash'
import Http from '../../driver/http/http'
import PaymentRepository from '../../driver/infra/repositories/payment.repository'
import queue from '../../driver/queue/queue'

class PaymentController {
    async create(req: any) {
        try {
            const item = JSON.parse(req.content)
            const paymentRepository = new PaymentRepository()
            const http = new Http()
            const hash = new Hash()
            const paymentGateway = new PaymentGateway()
            const paymentUseCase = new PaymentUseCases(paymentRepository, queue, http, hash, paymentGateway)
            await paymentUseCase.create(item)
            queue.ack(req)
        } catch (error) {
            queue.nack(req)
        }
    }

    async readById(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const http = new Http()
        const hash = new Hash()
        const paymentGateway = new PaymentGateway()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue, http, hash, paymentGateway)
        const result = await paymentUseCase.readById(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async read(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const http = new Http()
        const hash = new Hash()
        const paymentGateway = new PaymentGateway()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue, http, hash, paymentGateway)
        const result = await paymentUseCase.read()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async update(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const http = new Http()
        const hash = new Hash()
        const paymentGateway = new PaymentGateway()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue, http, hash, paymentGateway)
        const result = await paymentUseCase.update(parseInt(req.params.id), req.body)
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async delete(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const http = new Http()
        const hash = new Hash()
        const paymentGateway = new PaymentGateway()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue, http, hash, paymentGateway)
        const result = await paymentUseCase.delete(parseInt(req.params.id))
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async pay(req: Request, res: Response) {
        try {
            const paymentRepository = new PaymentRepository()
            const http = new Http()
            const hash = new Hash()
            const paymentGateway = new PaymentGateway()
            const paymentUseCase = new PaymentUseCases(paymentRepository, queue, http, hash, paymentGateway)
            const response = await paymentUseCase.pay(req.body)
            response ? res.status(200).send('ok') : res.status(404).send('pagamento não encontrado')
        } catch (error) {
            res.status(500).send('erro no pagamento')
        }
    }
}

export default new PaymentController()