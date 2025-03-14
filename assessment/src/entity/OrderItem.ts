import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDecimal, Min, Max } from "class-validator";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem {
    reduce(arg0: (acc: any, item: any) => any, arg1: number) {
        throw new Error("Method not implemented.");
    }
    forEach(arg0: (item: any) => void) {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    @Min(1)
    quantitySold: number;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    @IsDecimal()
    @Min(0)
    @Max(1)
    discount: number;

    @ManyToOne(() => Order, (order) => order.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToOne(() => Product, (product) => product.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product: Product;
}



