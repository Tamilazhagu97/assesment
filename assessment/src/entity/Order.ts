import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDecimal, Min } from "class-validator";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp" })
    dateOfSale: Date;

    @Column({ type: "varchar", length: 50 })
    paymentMethod: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    @IsDecimal()
    @Min(0)
    shippingCost: number;

    @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @OneToMany(()=> OrderItem, (orderItem)=>orderItem.order,)
    orderItems: OrderItem;
}
