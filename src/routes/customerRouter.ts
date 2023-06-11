import express, { Request, Response } from "express";
import * as customerController from "../controllers/customer";
import { Customer, BasicCustomer } from "../models/customer";
const customerRouter = express.Router();

customerRouter.get("/", async (req: Request, res: Response) => {
    customerController.findAll((err: Error, customers: Customer[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": customers });
    });
});

customerRouter.post("/", async (req: Request, res: Response) => {
    const newCustomer: Customer = req.body;

    customerController.create(newCustomer, (err: Error, customerId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).json({ "orderId": customerId });
    });
});

customerRouter.get("/:id", async (req: Request, res: Response) => {
    const customerId: number = Number(req.params.id);
    customerController.findOne(customerId, (err: Error, customer: Customer) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": customer });
    })
});

customerRouter.put("/:id", async (req: Request, res: Response) => {
    const customer: Customer = req.body;
    customerController.update(customer, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).send();
    })
});

export { customerRouter };