export interface User {
    username: string;
    role: "admin" | "arena_user" | "general_use";
    assignedArena: "North" | "South" | "Center" | "All";
}
