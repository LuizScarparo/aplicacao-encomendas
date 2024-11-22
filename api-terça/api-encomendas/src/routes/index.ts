import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveryLogsRoutes } from "./delivery-logs-routes";
import { healthCheckRoutes } from "./utils-routes";

const routes = Router()
routes.use("/api/teds/healthcheck", healthCheckRoutes)
routes.use("/api/teds/users", usersRoutes)
routes.use("/api/teds/sessions", sessionsRoutes)
routes.use("/api/teds/deliveries", deliveriesRoutes)
routes.use("/api/teds/delivery-logs", deliveryLogsRoutes)

export { routes }