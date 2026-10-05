import z from "zod";

export const CreateAlert = z.object({
    displayName: z.string(),
    description: z.string(),
    priority: z.literal(["Low", "Medium", "High", "Critical"]),
    arena: z.optional(["North", "South", "Center"]),
    status: z.optional(["Active", "Handled"]),
    lon: z.number(),
    lat: z.number(),
});

export const UpdatAlert = CreateAlert.partial();
