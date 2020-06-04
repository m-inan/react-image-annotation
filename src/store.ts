import create from "zustand";
import { Region, Store } from "./types";

const [useStore, store] = create<Store>((set, get) => ({
  isReady: false,
  setReady: (isReady: boolean) => set({ isReady }),

  active: null,
  setActive: (active: number) => set({ active }),

  isDrawing: false,
  setDrawing: (isDrawing: boolean) => set({ isDrawing }),

  regions: [],
  setRegions: (regions: Array<Region>) => set({ regions }),

  addRegion: (id: number) => {
    let regions = get().regions;

    // remove active region
    regions = regions.filter((region: Region) => region.closed === true);

    set({
      active: id,
      isDrawing: true,

      regions: [
        ...regions,
        {
          id,
          closed: false,
          points: [],
          texts: [],
        },
      ],
    });
  },
}));

export { useStore, store };
