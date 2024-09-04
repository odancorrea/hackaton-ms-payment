import { Express } from "express-serve-static-core";
import iDrivenAdapter from "../iDriven.adapter";
import express from "express"
import application from "../controller/application.controller";
import paymentController from "../controller/payment.controller";

class Server implements iDrivenAdapter{
    app: Express
    
    constructor(private port: string) {
        this.app = express()
    }

    async init(): Promise<void> {
        this.setMiddlewares()
        this.setRoutes()
        await this.start()
    }

    setMiddlewares() {
        this.app.use(express.json())
    }

    setRoutes() {
        // application
        this.app.get('/ping', application.ping)
        //payment
        this.app.post('/payment', paymentController.create)
        this.app.get('/payment/:id', paymentController.readById)
        this.app.get('/payment', paymentController.read)
        this.app.put('/payment:/id', paymentController.update)
        this.app.delete('/payment/:id', paymentController.delete)
        this.app.post('/payment/pay', paymentController.pay)
    }

    async start(): Promise<void> {
        this.app.listen(this.port, () => { console.log(`Server running at port ${process.env.PORT}`) })
    }
}

export default new Server(process.env.PORT || '3033')