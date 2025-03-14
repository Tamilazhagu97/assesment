import  * as express from "express";
import { RevenueController } from "../controllers/revenueController";
import { ProductController } from "../controllers/productController";
import { Product } from "../entity/Product";
import { uploadCSV } from "../controllers/filecontroller";

const router = express.Router();

// Revenue routes
router.get("/revenue/total", RevenueController.getTotalRevenue);
router.get("/revenue/product", RevenueController.getRevenuePerProduct);

// Product routes
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById.bind(Product));
router.post("/products", ProductController.createProduct);
router.put("/products/:id", ProductController.updateProduct.bind(Product));
router.delete("/products/:id", ProductController.deleteProduct.bind(Product));


// Route for uploading and processing CSV file
router.post("/upload-csv", uploadCSV);

export default router;
