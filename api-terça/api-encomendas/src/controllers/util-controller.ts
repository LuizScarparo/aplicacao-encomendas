import { Request, Response } from "express"

export class UtilsController {
    healthCheck = async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({message: "Servidor Funcionando"})
    }
}