import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { Product } from "../entity/Product";

export class RevenueController {
    // Calculate total revenue
    static async getTotalRevenue(req: Request, res: Response) {
        try {
            const orders = await AppDataSource.getRepository(Order).find({ relations: ["orderItems"] });

            let totalRevenue = 0;
            orders.forEach(order => {
                order.orderItems.forEach(item => {
                    totalRevenue += item.quantitySold * (item.product.unitPrice - item.product.unitPrice * item.discount);
                });
            });

            res.status(200).json({ totalRevenue });
        } catch (error) {
            console.error("Error calculating total revenue:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Calculate revenue per product
    static async getRevenuePerProduct(req: Request, res: Response) {
        try {
            const products = await AppDataSource.getRepository(Product).find({ relations: ["orderItems"] });

            const productRevenue = products.map(product => {
                const revenue = product.orderItems.reduce((acc, item) => {
                    if (item.product.id === product.id) {
                        return acc + item.quantitySold * (item.product.unitPrice - item.product.unitPrice * item.discount);
                    }
                    return acc;
                }, 0);
                return { productName: product.name, revenue };
            });

            res.status(200).json({ productRevenue });
        } catch (error) {
            console.error("Error calculating revenue per product:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
