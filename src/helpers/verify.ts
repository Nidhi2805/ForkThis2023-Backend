import crypto from 'crypto';
import envHandler from "../managers/envHandler.js";
import { Request } from "express";

export const verify_signature = (req: Request) => {
  const WEBHOOK_SECRET: string = envHandler("WEBHOOK_SECRET");
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)   
    .update(JSON.stringify(req.body))
    .digest("hex");
  let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
  let untrusted =  Buffer.from((req.headers as any)["x-hub-signature-256"], 'ascii');
  return crypto.timingSafeEqual(trusted, untrusted);
};