import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const JWT_SCERET = process.env.JWT_SCERET;
