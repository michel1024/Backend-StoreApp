import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import { orderRouter } from "./routes/orderRouter";
import { productRouter } from "./routes/productRouter";
import { customerRouter } from "./routes/customerRouter";

const app = express();
dotenv.config();

app.use(cors())
app.use(bodyParser.json());
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);

let port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("Node server started running on port", port);
});