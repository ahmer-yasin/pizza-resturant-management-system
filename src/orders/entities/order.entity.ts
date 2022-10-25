import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Topping } from "./topping.entity";

export enum Status {
    PENDING = 'pending',
    DOUGH = 'Dough',
    TOPPING = 'Topping',
    OVEN = 'Oven',
    SERVED = 'served',
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'uuid',
        unique: true,
    })
    @Generated('uuid')
    uuid: string;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    start_time: Date;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    end_time: Date;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
        select: false,
    })
    status: Status;

    @OneToMany(
        () => Topping,
        (topping) => topping.order,
    )
    topping: Topping[];

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
