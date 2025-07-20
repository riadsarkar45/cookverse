import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma/client"

export const allUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, email } = req.body as { name: string; email: string };

        if (!name || !email) return reply.status(400).send({ message: "Please fill all the fields" });

        const isEmailExist = await prisma.user.findUnique(

            {
                where: {
                    email: email
                }
            }
        )
        if (isEmailExist) {
            return reply.status(400).send({ message: "Email already exists" });
        }

        const newUser = await prisma.user.create({
            data: {
                name: name, email: email
            }
        })

        return reply.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const addNewRecipe = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { title, description, category, instructions, addedBy } = req.body as {
            title: string;
            description: string;
            category: string;
            ingredients: string[];
            instructions: string;
            addedBy: number;
        };

        if (
            !title ||
            !description ||
            !category ||
            !instructions ||
            !addedBy
        ) {
            return reply.status(400).send({ message: "Please fill all the fields" });
        }

        const newRecipe = await prisma.recipe.create({
            data: {
                title,
                description,
                category,
                instructions,
                addedBy,
            },
        });

        return reply.status(201).send({ message: "Recipe created successfully", recipe: newRecipe });
    } catch (error) {
        console.error("Error creating recipe:", error);
        return reply.status(500).send({ message: "Internal server error" });
    }
};

export const getAllRecipes = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const recipes = await prisma.recipe.findMany();
        if (recipes.length === 0) {
            return reply.status(404).send({ message: "No recipes found" });
        }
        return reply.status(200).send({ recipes });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return reply.status(500).send({ message: "Internal server error" });
    }
};