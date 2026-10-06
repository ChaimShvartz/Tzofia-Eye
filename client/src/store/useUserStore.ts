import { create } from "zustand";
import type { User } from "../types/User";

interface UserStore {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    token: null,
    setUser: (user: User, token: string) => set({ user, token }),
}));

export default useUserStore;
