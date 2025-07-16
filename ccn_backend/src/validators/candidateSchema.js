import { z } from "zod";

export const candidateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
