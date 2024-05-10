import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_rounds: process.env.BCRYPT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    expireIn: process.env.JWT_EXPIRE_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refresh_expireIn: process.env.JWT_REFRESH_EXPIRE,
  },
};
