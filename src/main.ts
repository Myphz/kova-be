import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error.js";
import { AiAPI } from "./routes/ai.js";

const app = express();
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

// To get correct ip for rate limiter
app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost",
      "https://localhost",
      "capacitor://localhost",
      "https://kova",
      "http://kova"
    ]
  })
);

app.use("/", AiAPI);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
