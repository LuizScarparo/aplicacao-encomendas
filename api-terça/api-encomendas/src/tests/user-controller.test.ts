import request from "supertest";
import { app } from "../app";
import { prisma } from "../database/prisma";

beforeEach(async () => {
    await prisma.deliveryLog.deleteMany();
    await prisma.delivery.deleteMany();
    await prisma.user.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("UsersController", () => {
    it("deve criar um novo usuário", async () => {
        const response = await request(app).post("/api/teds/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test User");
    });

    it("não deve criar um usuário com e-mail duplicado", async () => {
        await request(app).post("/api/teds/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
        });

        const response = await request(app).post("/api/teds/users").send({
            name: "Another User",
            email: "testuser@example.com",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User with same email already exists");
    });

    it("não deve criar um usuário com dados inválidos", async () => {
        const response = await request(app).post("/api/teds/users").send({
            name: "Te",
            email: "invalidemail",
            password: "123",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
});


