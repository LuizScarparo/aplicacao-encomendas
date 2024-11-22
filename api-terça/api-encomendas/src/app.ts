import express from "express"
import "express-async-errors"

import { errorHandling } from "./middlewares/error-handler"
import { routes } from "./routes"
import { connectRabbitMQ } from "./configs/rabbitmq"
import { consumeMessages } from "./controllers/message-consumer"

import cors from 'cors';

const app = express()

app.use(cors({ origin: "http://localhost:3000" })); 

app.use(express.json())

app.use(routes)

app.use(errorHandling)

connectRabbitMQ().then(() => {
    consumeMessages('deliveryQueue');
});


export { app }