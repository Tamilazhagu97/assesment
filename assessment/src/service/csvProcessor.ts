import * as fs from "fs";
import * as fastCsv from "fast-csv";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { Product } from "../entity/Product";
import { Customer } from "../entity/Customer";

export const processCSV = async (filePath: string) => {
    const stream = fs.createReadStream(filePath);
    const csvParser = fastCsv.parse({ headers: true });
    const connection = await AppDataSource.initialize();
    
    stream.pipe(csvParser)
        .on("data", async (row) => {
            const customer = await connection.getRepository(Customer).save({
                name: row["Customer Name"],
                email: row["Customer Email"],
                address: row["Customer Address"],
            });

            const product = await connection.getRepository(Product).save({
                name: row["Product Name"],
                category: row["Category"],
                unitPrice: parseFloat(row["Unit Price"]),
            });

            const order = await connection.getRepository(Order).save({
                customer,
                dateOfSale: new Date(row["Date of Sale"]),
                paymentMethod: row["Payment Method"],
                shippingCost: parseFloat(row["Shipping Cost"]),
            });

            await connection.getRepository(OrderItem).save({
                order,
                product,
                quantitySold: parseInt(row["Quantity Sold"], 10),
                discount: parseFloat(row["Discount"]),
            });
        })
        .on("end", () => {
            console.log("CSV processing complete.");
            connection.destroy();
        });
};