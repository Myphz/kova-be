import express from "express";
import { z } from "zod";
import { getAIResponse } from "../ai/generate.js";
import { validateBody } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";

export const AiAPI = express.Router();

const paramsSchema = z.object({
  title: z.string(),
  text: z.string()
});

const withQuestParam = validateBody(paramsSchema);

AiAPI.post(
  "/generate-description",
  withQuestParam,
  asyncHandler(async (req, res) => {
    const quest = paramsSchema.parse(req.query);
    const description = await getAIResponse({ prompt: JSON.stringify(quest) });
    res.json({ description });
  })
);
