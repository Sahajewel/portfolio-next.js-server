import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
export const verifyToken = (req: Request, res: Response, next: NextFunction)=>{
 const authHeader = req.headers.authorization;
 if(!authHeader){
    return res.status(401).json({
        success: false,
        message: "No token provided. Unauthorized"
    })
 }
 const token = authHeader.split(" ")[1];
 try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if(typeof decoded === "string"){
        return res.status(401).json({
            success: false,
            message: "Invalid token payload"
        })
    }
    (req as any).user = decoded;
    next()
 }catch(error){
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
 }
}