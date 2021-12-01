import { NextFunction, Request,Response } from "express";

export function loggedInAPI(req:Request,res:Response,next:NextFunction){
    if(req.session["user"]){
        next();
    }else{
        res.json({message:"user doesn't login"});
    }
}