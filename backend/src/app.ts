import express, { Express, NextFunction, Request, Response } from "express";
import usersRoutes from "./routes/users";
import morgan from "morgan";

const app: Express = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/users", usersRoutes);

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
