import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

export class ProductController {
    // Get all products
    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await AppDataSource.getRepository(Product).find();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error retrieving products:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get a product by ID
    static async getProductById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const product = await AppDataSource.getRepository(Product).findOne({ where: { id: parseInt(id) } });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.status(200).json(product);
        } catch (error) {
            console.error("Error retrieving product:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Create a new product
    static async createProduct(req: Request, res: Response) {
        const { name, category, unitPrice } = req.body;

        try {
            const product = new Product();
            product.name = name;
            product.category = category;
            product.unitPrice = unitPrice;

            const savedProduct = await AppDataSource.getRepository(Product).save(product);
            res.status(201).json(savedProduct);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Update an existing product
    static async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { name, category, unitPrice } = req.body;

        try {
            const product = await AppDataSource.getRepository(Product).findOne({ where: { id: parseInt(id) } });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            product.name = name || product.name;
            product.category = category || product.category;
            product.unitPrice = unitPrice || product.unitPrice;

            const updatedProduct = await AppDataSource.getRepository(Product).save(product);
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Delete a product
    static async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const product = await AppDataSource.getRepository(Product).findOne({ where: { id: parseInt(id) } });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            await AppDataSource.getRepository(Product).remove(product);
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
