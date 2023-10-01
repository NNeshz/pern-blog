import { z } from "zod";

export const blogSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }).min(1, {
        message: "Title is too short, try with a longer one",
    }).max(100),
    content: z.string({
        required_error: "Content is required",
    }).min(1, {
        message: "Content is too short, it needs to be at least 1 character long",
    }).max(1000),
})