import express from 'express'   
import { UtilsController } from '../controllers/util-controller';

const utilsController = new UtilsController();
const healthCheckRoutes = express.Router()

healthCheckRoutes.get('/', utilsController.healthCheck)

export { healthCheckRoutes }