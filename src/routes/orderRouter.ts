import express, { Request, Response } from "express";
import * as orderController from "../controllers/order";
import { Order, BasicOrder } from "../models/order";
const orderRouter = express.Router();

orderRouter.get("/", async (req: Request, res: Response) => {
    orderController.findAll((err: Error, orders: Order[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": orders });
    });
});

orderRouter.post("/", async (req: Request, res: Response) => {
    const newOrder: BasicOrder = req.body;
    console.log({newOrder});
    
    orderController.create(newOrder, (err: Error, orderId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).json({ "orderId": orderId });
    });
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
    const orderId: number = Number(req.params.id);
    orderController.findOne(orderId, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    })
});

orderRouter.put("/:id", async (req: Request, res: Response) => {
    const order: Order = req.body;
    orderController.update(order, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).send();
    })
});

export { orderRouter };