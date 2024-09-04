import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Payment {
    static SALE_STATUS_START: string = 'iniciado'
    static SALE_STATUS_PAID: string = 'pago'
    static SALE_STATUS_REFUSED: string = 'recusado'
    
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    id_sale: number

    @Column()
    status: string

    @Column()
    code: string

    constructor (id_sale:  number, status: string, code: string) {
        this.id_sale = id_sale
        this.status = status
        this.code = code
    }
}