import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME as string,
    process.env.DB_USER_NAME as string,
    process.env.DB_PASS_WORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: "mysql",
        port: parseInt(process.env.DB_PORT as string, 10),
        dialectOptions: {
            connectTimeout: 5000
        }
    }
);

export default sequelize;
