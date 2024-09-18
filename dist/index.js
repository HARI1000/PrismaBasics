"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express = require("express");
var bodyParser = require('body-parser');
const prisma = new client_1.PrismaClient();
const app = express();
app.use(bodyParser.json());
// async function insertUser(username: string, password: string, firstName: string, lastName: string) {
//     try{
//         const res = await prisma.users.create({
//             data:{
//                 email:username,
//                 firstName,
//                 lastName,
//                 password,
//             }
//         });
//         return res;
//     }
//     catch(err)
//     {
//         return err;
//     }
// }
// interface UpdateParams {
//     firstName: string;
//     lastName: string;
// }
// async function updateUser(username: string, {
//     firstName,
//     lastName
// }: UpdateParams) {
//     try{
//         const res = await prisma.users.update({
//             where:{email:username},
//             data:{
//                 firstName,
//                 lastName
//             }
//         });
//         return res;
//     }
//     catch(err)
//     {
//         return err;
//     }
// }
// async function getUser(username: string) {
//     try{
//         const res = await prisma.users.findFirst({
//             where:{email:username},
//         })    
//         return res;
//     }
//     catch(err)
//     {
//         return err;
//     }
// }
// async function createTodo(userId: number, title: string, description: string) {
//     try{
//         const res = await prisma.todos.create({
//             data:{
//                 userId,
//                 title,
//                 description,
//             }
//         })
//         return res;
//     }
//     catch(err)
//     {
//         return err;
//     }
// }
// async function getTodos(userId: number, ) {
//     try{
//         const res = await prisma.todos.findMany({
//             where   :{userId:userId}
//         })
//         return res;
//     }
//     catch(err)
//     {
//         return err;
//     }
// }
// async function getTodosAndUserDetails(userId: number, ) {
//     try{
//         const todoRes = await prisma.todos.findMany({
//             where:{userId:userId},
//             select:{
//                 user:true,
//                 title:true,
//                 description:true,
//             }
//         })
//         return todoRes;
//     }
//     catch(err)
//     {
//         return err;
//     }
// }
// getTodosAndUserDetails(1);
// getTodos(1);
// createTodo(1, "go to gym", "go to gym and do 10 pushups");
// insertUser("admin1@gmail.com","123456","hari","m");    
// updateUser("admin1@gmail.com",{firstName:"Harishankar",lastName:"M"});
// getUser("admin1@gmail.com");
app.get("/todos", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.query.userid);
        try {
            const response = yield prisma.todos.findMany({
                where: { userId: userId }
            });
            res.status(200).json(response);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});
app.post("/createtodo", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, title, description } = req.body;
            const response = yield prisma.todos.create({
                data: {
                    userId,
                    title,
                    description,
                }
            });
            res.status(200).json(response);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});
app.post("/createuser", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, firstName, lastName, password } = req.body;
            const response = yield prisma.users.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    password,
                }
            });
            res.status(200).json(response);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (err.code === 'P2002') {
                    res.status(500).json('There is a unique constraint violation, a new user cannot be created with this email');
                }
            }
        }
    });
});
app.put("/updateuser", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, firstName, lastName, password } = req.body;
            if (!email) {
                throw { message: "Email should be give for updating", code: "emailNotProvided" };
            }
            const response = yield prisma.users.update({
                where: { email: email },
                data: {
                    firstName,
                    lastName,
                    password
                }
            });
            res.status(200).json(response);
        }
        catch (err) {
            if (err.code == "emailNotProvided") {
                res.status(500).json(err.message);
            }
            res.status(500).json(err);
        }
    });
});
app.get("/user", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.query.username;
        console.log(username);
        try {
            const response = yield prisma.users.findFirst({
                where: { email: username },
            });
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
});
app.listen(3000, () => {
    console.log("started things");
});
