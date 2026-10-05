import z from "zod";

export const CreatingAlert = z.object({
    displayName: z.string(),
    description: z.string(),
    priority: z.literal(["Low", "Medium", "High", "Critical"]),
    arena: z.literal(["North", "South", "Center"]),
    status: z.literal(["Active", "Handled"]),
    lon: z.number(),
    lat: z.number(),
});

export const UpdatingAlert = CreatingAlert.partial();
