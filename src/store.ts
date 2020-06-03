import create from "zustand";
import { Region } from "./types";

type Store = {
  isReady: boolean;
  setReady: (isReady: boolean) => void;

  regions: Array<Region>;
  setRegions: (regions: Array<Region>) => void;
};

const [useStore, store] = create<Store>((set) => ({
  isReady: false,
  setReady: (isReady: boolean) => set({ isReady }),

  regions: [],
  setRegions: (regions: Array<Region>) => set({ regions }),
}));

export { useStore, store };
