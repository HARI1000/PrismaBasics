import { PrismaClient ,Prisma} from "@prisma/client";
const express = require("express");
var bodyParser = require('body-parser');
const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json())

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

app.get("/todos",async function(req:any,res:any){
    const userId = parseInt(req.query.userid);
    try{
        const response = await prisma.todos.findMany({
            where   :{userId:userId}
        })
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
})
app.post("/createtodo",async function(req:any,res:any){
    try{
        const {userId,title,description} = req.body;
        const response = await prisma.todos.create({
            data:{
                userId,
                title,
                description,
            }
        })
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
})
app.post("/createuser",async function(req:any,res:any){
    try{
        const {email,firstName,lastName,password}=req.body;
        const response = await prisma.users.create({
            data:{
                email,
                firstName,
                lastName,
                password,
            }
        });
        res.status(200).json(response);
    }
    catch(err)
    {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === 'P2002') {
                res.status(500).json(
                'There is a unique constraint violation, a new user cannot be created with this email'
              );
            }
          }
    }
})
app.put("/updateuser",async function(req:any,res:any){
    try{
        const {email,firstName,lastName,password}=req.body;
        if(!email){
            throw { message: "Email should be give for updating", code:"emailNotProvided" };
        }
        const response = await prisma.users.update({
            where:{email:email},
            data:{
                firstName,
                lastName,
                password
            }
            
        });
        res.status(200).json(response);
    }
    catch(err:any)
    {
        if(err.code=="emailNotProvided")
        {
            res.status(500).json(err.message);   
        }
        res.status(500).json(err);
    }
})
app.get("/user",async function(req:any,res:any){
        const username = req.query.username;
    try{
        const response = await prisma.users.findFirst({
            where:{email:username},
        })    
        res.status(200).json(response);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})


app.listen(3000,()=>{
    console.log("started things");
})