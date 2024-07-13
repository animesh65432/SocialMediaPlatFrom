import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({
    data: "hello form server",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server start at the ${process.env.PORT}`);
});
