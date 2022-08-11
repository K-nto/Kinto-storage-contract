import crypto from "crypto";
import { Operation } from "./operations";

export class FileOperation {
  public id: string;
  public fileHash: string;
  public wallet: string;
  public operation: Operation;

  constructor(fileHash: string, wallet: string, operation: Operation) {
    this.id = crypto.randomBytes(32).toString("hex");
    this.fileHash = fileHash;
    this.wallet = wallet;
    this.operation = operation;
  }
}
