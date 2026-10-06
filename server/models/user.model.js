import z from "zod";

export const User = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email(),
    role: z.literal(["admin", "general_user", "arena_user"]),
    assignedArena: z.literal(["North", "South", "Center", "All"]),
});
