import { NextFunction, Request } from "express";
import { FullResponse } from "./types/full_response";
import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv"
import { Server as IO } from "socket.io";
import { ensureAuthenticated, parseToken, verifyTokenIsValid } from "./controllers/auth";
import connectToDB from "./config/db"

import productRoutes from './routes/products';
import authRoutes from './routes/auth';

dotenv.config()

async function main() {
  const app = express()
  const server = createServer(app)
  const io = new IO(server, {
    cors: {
      origin: "*",
      credentials: true
    }
  })

  io.use(async (socket, next) => {
    try{
      const token = socket.handshake.auth.token

      if(!await verifyTokenIsValid(token, db)) throw new Error()
        next()
    } catch (e){
      next(new Error((e as any).toString()))
    }
  })

  const db = (await connectToDB())!;

  app.use(cors());

  // Middleware to add db to req
  app.use((req: Request, res: FullResponse, next: NextFunction) => {
    res.locals.db = db;
    res.locals.io = io;
    next();
  });

  // Middleware parse JSON requests if exists
  app.use(express.json());
  app.use(parseToken);
  app.use('/api/products', ensureAuthenticated, productRoutes);
  app.use('/api/auth', authRoutes);

  const PORT = process.env.NODEJS_PORT || 3000;
  server.listen(PORT, () => {
    console.log("Server Listening on port", PORT);
  });
}

main().catch(err => {
  console.error('Failed to start server:', err);
});