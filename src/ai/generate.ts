import { client } from "./client.js";
import { SYSTEM_PROMPT } from "./prompts.js";

export const getAIResponse = async ({
  prompt,
  systemPrompt
}: {
  prompt: string;
  systemPrompt?: string;
}) => {
  const structuredPrompt = {
    model: "gpt-4o-mini",
    instructions: systemPrompt || SYSTEM_PROMPT,
    input: prompt
  };

  const response = await client.responses.create(structuredPrompt);
  return response.output_text;
};
