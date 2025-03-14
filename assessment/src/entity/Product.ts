import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDecimal, Min,Length } from "class-validator";
import { OrderItem } from "./OrderItem";
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 150 })
    @Length(2, 150)
    name: string;

    @Column({ type: "varchar", length: 100 })
    category: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    @IsDecimal()
    @Min(0)
    unitPrice: number;

    @OneToMany(()=> OrderItem, (orderItem)=>orderItem.product)
    orderItems: OrderItem;
}


