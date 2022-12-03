import { atom } from "jotai";

export const addressAtom = atom<`0x${string}` | undefined>(undefined);
