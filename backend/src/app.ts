import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response) => {
  let errorMessage = "An unknown error occured";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});

export default app;
