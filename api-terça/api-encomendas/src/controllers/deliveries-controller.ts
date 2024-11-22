import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { string, z } from "zod"
import { sendMessageToQueue } from "./message-producer"


class DeliveriesController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: string()
        })

        const { user_id, description } = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })
        const deliveryMessage = JSON.stringify({ user_id, description, status: 'Created' });
        await sendMessageToQueue('deliveryQueue', deliveryMessage);
        return response.status(201).json({message: "Entrega criada"})
    }

    async index(request: Request, response: Response) {
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {select: {name: true, email: true}}
            }
        })

        return response.json(deliveries)
    }

    async delete(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
    
        try {
            const { id } = paramsSchema.parse(request.params);
    
            const delivery = await prisma.delivery.findUnique({
                where: { id },
            });
    
            if (!delivery) {
                return response.status(404).json({ message: "Entrega não encontrada" });
            }
    
            await prisma.deliveryLog.deleteMany({
                where: { deliveryId: id },
            });
    
            await prisma.delivery.delete({
                where: { id },
            });
    
            const deliveryMessage = JSON.stringify({ delivery_id: id, status: 'Deleted' });
            await sendMessageToQueue('deliveryQueue', deliveryMessage);
    
            return response.status(200).json({ message: "Entrega deletada com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar entrega:", error);
            return response.status(400).json({ message: "Erro ao deletar entrega", error });
        }
    }
    
    
    
}

export { DeliveriesController }