import { Db } from "mongodb";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { FullResponse } from "../types/full_response";
import { User } from "../types/user";

const bcrypt = require("bcrypt");


function fetchFromPasswordAndEmail(db: Db, email: string, password: string){
  //password is saved without hash, cause i have no time to implement bcrypt
  return db.collection("users").findOne({email, password})
}

export function verifyTokenIsValid(token: string, db: Db){
  return new Promise((res) => {
    jwt.verify(token, process.env.JWT_SECRET!, async function (err, decoded) {
      if (err) return res(false);
      const user = (await db.collection("users").findOne({_id: (decoded as any).id})) as any as User
      if (!user) return res(false);
      res(true);
    })
  })
}

export async function parseToken(req: Request, res: FullResponse, next: Function){
  const token = req.header("Authorization")?.split("bearer ")?.[1]

  if(!token) return next();
  jwt.verify(token, process.env.JWT_SECRET!, async function (err, decoded) {
    if (err) return next();
    res.locals.user = (await res.locals.db.collection("users").findOne({_id: (decoded as any).id})) as any as User
    delete res.locals.user.password
    next();
  })
}

export function ensureAuthenticated(req: Request, res: FullResponse, next: Function){
  if(!res.locals.user) return res.status(401).send({ error: "Must be authenticated." });
  next()
}

export async function login(req: Request, res: FullResponse){
  const { email, password } = req.body;
  const user = await fetchFromPasswordAndEmail(res.locals.db, email, password)
  if(user){
    res.status(200).json({token: jwt.sign({id: user._id}, process.env.JWT_SECRET!, { expiresIn: 86400 })})
  } else res.status(404).json({error: "Not found"})
}