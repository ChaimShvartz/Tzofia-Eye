export interface User {
    id:string
    username: string;
    role: "admin" | "arena_user" | "general_user";
    assignedArena: "North" | "South" | "Center" | "All";
}
