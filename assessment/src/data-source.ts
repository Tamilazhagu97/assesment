import "reflect-metadata"
import { DataSource } from "typeorm"
import { Customer } from "./entity/Customer"
import { Product } from "./entity/Product"
import { Order } from "./entity/Order"
import { OrderItem } from "./entity/OrderItem"
import { Region } from "./entity/Region"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Customer, Product, Order, OrderItem, Region],
    migrations: [],
    subscribers: [],
})
