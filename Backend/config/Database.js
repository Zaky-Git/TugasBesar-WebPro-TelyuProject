import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize(
  "freedb_telyu_project",
  "freedb_bukanzaky",
  "nfjMy$MjGPPaJ4f",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export default db;
