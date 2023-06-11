import express, { Request, Response } from "express";
import * as productController from "../controllers/product";
import { Product, BasicProduct } from "../models/product";
const productRouter = express.Router();

productRouter.get("/", async (req: Request, res: Response) => {
    productController.findAll((err: Error, products: Product[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": products });
    });
});

productRouter.post("/", async (req: Request, res: Response) => {
    const newProduct: Product = req.body;

    productController.create(newProduct, (err: Error, productId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).json({ "orderId": productId });
    });
});

productRouter.get("/:id", async (req: Request, res: Response) => {
    const productId: number = Number(req.params.id);
    productController.findOne(productId, (err: Error, product: Product) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": product });
    })
});

productRouter.put("/:id", async (req: Request, res: Response) => {
    const product: Product = req.body;
    productController.update(product, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).send();
    })
});

export { productRouter };