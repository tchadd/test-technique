import type { Response } from "express";
import type { Db } from "mongodb";
import type { Server } from "socket.io";
import { User } from "./user";

export type FullResponse = {
    locals: {
        db: Db,
        io: Server,
        user?: User,
    }
} & Response