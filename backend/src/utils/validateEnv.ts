import { cleanEnv } from "envalid";
import { num, port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_DB_CONNECTION_STRING: str(),
  JWT_SECRETE_KEY: str(),
  JWT_EXPIRES_IN: num(),
});
