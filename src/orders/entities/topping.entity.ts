import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

export enum Status {
    PENDING = 'pending',
    DONE = 'DONE'
}

@Entity()
export class Topping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    topping: string;

    @Column({
        type: 'int',
        default: null,
    })
    orderId: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
        select: false,
    })
    status: Status;

    @ManyToOne((type) => Order)
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    order: Order;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        select: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        select: false,
    })
    updatedAt: Date;
}
