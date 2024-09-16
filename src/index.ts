import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.users.create({
        data:{
            email:username,
            firstName,
            lastName,
            password,
        }
    });
    console.log(res);
}

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
    const res = await prisma.users.update({
        where:{email:username},
        data:{
            firstName,
            lastName
        }
        
    });
    console.log(res);
}

async function getUser(username: string) {
    const res = await prisma.users.findFirst({
        where:{email:username},
    })    
    console.log(res);
}

// insertUser("admin1@gmail.com","123456","hari","m");
// updateUser("admin1@gmail.com",{firstName:"Harishankar",lastName:"M"});
getUser("admin1@gmail.com");