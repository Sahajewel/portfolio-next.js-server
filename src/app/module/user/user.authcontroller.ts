import { Request, Response } from "express";
import { UserService } from "./user.service";
import { Prisma } from "@prisma/client";


const createUser = async(req: Request, res: Response)=>{
    try{
        const user = await UserService.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            date: user
        })
    }catch(error:any){
        console.log(error)
           // Unique constraint error
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === "P2002"){
                return res.status(400).json({
                    success: false,
                    message: `A user with this ${error.meta?.target} already exist`
                })
            }
        }
        // validation error (missing ? invalid fields)
        if(error instanceof Prisma.PrismaClientValidationError){
            return res.status(400).json({
                success: false,
                message: "Invalid or missing input. Please check your data"
            })
        }
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong creating the user. please try again later"
        })
    }
}
const getUser = async(req: Request, res: Response)=>{
   try{
     const user = await UserService.getUser();
     if(!user || user.length === 0){
        return res.status(404).json({
            success: false,
            message: "No user found",
            data: []
        })
     }
     res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
     })
   }catch(error){
    console.log(error)
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        return res.status(400).json({
            success: false,
            message: "Database request error. please check your query"
        })
    }
    if(error instanceof Prisma.PrismaClientValidationError){
        return res.status(400).json({
            success: false,
            message: "Invalid requset parameters"
        })
    }
res.status(200).json({
        success: true,
        message: "User fetched problem",
        
     })
   }

}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
     if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    const user = await UserService.getSingleUser(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single User fetched successfully.",
      data: user,
    });
  } catch (error: any) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        success: false,
        message: "Database request error. Please check your query.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while fetching the user. Please try again later.",
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
     if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty. Provide fields to update.",
      });
    }

    const updatedUser = await UserService.updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error);

    // Handle if user not found
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Database request error. Please check your query.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while updating the user. Please try again later.",
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
     if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    const deletedUser = await UserService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (error: any) {
    console.error(error);

    // User not found error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Database request error. Please check your query.",
      });
    }

    // Unknown server error
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while deleting the user. Please try again later.",
    });
  }
};
export const UserController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}