import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices"; // Add this import statement

type StoreState = AuthSlice;

export const useAppStore = create<StoreState>()((...a) => ({
    ...createAuthSlice(...a),
}));