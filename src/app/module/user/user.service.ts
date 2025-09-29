import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import bcrypt from "bcryptjs"


const createUser = async(payload: Prisma.UserCreateInput)=>{
  if(!payload.password){
    throw new Error("password is required");
    
  }
  const hashedPassword = await bcrypt.hash(payload.password, Number(process.env.SALT_ROUNDS))
    const userCreate = await prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword
        }
    })
    const {password, ...safeUser} = userCreate
    return safeUser
}
const login = async(payload: {["email Or Username"]: string, password: string,})=>{
  const emailOrUsername = payload["email Or Username"]
    if (!emailOrUsername || !payload.password ) {
    throw new Error("Invalid or missing input. Please check your data");
  }
const user = await prisma.user.findFirst({
  where: {
    OR:[
      {email: emailOrUsername},
      {username: emailOrUsername}
    ]
  }
  // select: {id: true, email: true, password: true}
})
if(!user){
  throw new Error("User not found")
}
const isMatched = await bcrypt.compare(payload.password, user.password)
if(!isMatched){
  throw new Error("Invalid Password")
}
 const { password, ...safeUser } = user;
return safeUser
}
const getUser = async()=>{
    const userGet = await prisma.user.findMany();

    return userGet;
}
const getSingleUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const updateUser = async (id: string, payload: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return user;
};
const deleteUser = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
};

 export const UserService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    login
 }