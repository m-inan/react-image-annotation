import create from "zustand";
import { Region } from "./types";

type Store = {
  regions: Array<Region>;
  setRegions: (regions: Array<Region>) => void;
};

const [useStore, store] = create<Store>((set) => ({
  regions: [],
  setRegions: (regions: Array<Region>) => set({ regions }),
}));

export { useStore, store };
