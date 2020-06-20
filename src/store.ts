import create from "zustand";
import { Region, Store, Dimension } from "./types";

const [useStore, store] = create<Store>((set, get) => ({
  isReady: false,
  setReady: (isReady: boolean) => set({ isReady }),

  active: null,
  setActive: (active: number) => set({ active }),

  selected: null,
  setSelected: (selected: number) => set({ selected }),

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

  source: "",
  setSource: (source: string) => set({ source, isReady: false }),

  width: window.innerWidth,
  setWidth: (width: number) => set({ width }),

  height: window.innerHeight,
  setHeight: (height: number) => set({ height }),

  scale: 1,
  setScale: (scale: number) => set({ scale }),

  dimension: { width: 100, height: 100 },
  setDimension: (dimension: Dimension) => set({ dimension }),
}));

export { useStore, store };
