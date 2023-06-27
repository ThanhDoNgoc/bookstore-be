import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config()

export default class DatabaseConnection {
  private _connectionString: string = process.env.MONGODB;
  private mongodb: mongoose.Mongoose = mongoose;
  private static instance: DatabaseConnection = new DatabaseConnection();
  constructor() {}

  public static getInstance(): DatabaseConnection {
    return this.instance;
  }

  private config() {
    this.mongodb.set("strictQuery", true);
  }

  public async connect(): Promise<void> {
    try {
      this.config();
      await this.mongodb.connect(this._connectionString).then(async () => {
        console.log("Db connected");
      });
    } catch (error) {
      console.log("Could not connect to the database", error);
      process.exit();
    }
  }
}
