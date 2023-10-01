import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string({
      required_error: "Comment content is required",
    })
    .min(1, {
      message: "Comment content must be at least 1 character long",
    })
    .max(1000),
});
