import { Router } from "express";
import { DeliveriesController } from "../controllers/deliveries-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization";
import { DeliveryStatusController } from "../controllers/deliveries-status-controller";

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController()
const deliveriesStatusController = new DeliveryStatusController()


deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["salesperson"]))
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)
deliveriesRoutes.delete("/:id/delete", deliveriesController.delete);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update)


export { deliveriesRoutes }