export type ID = number;

export type Point = {
  id: number;
  x: number;
  y: number;
};

export type Text = {
  id: number;
  x: number;
  y: number;
  size: number;
  value: string;
  color: string;
  width: number;
  height: number;
  rotation: number;
};

export type Region = {
  id: ID;
  closed: boolean;
  points: Point[];
  texts: Text[];
};

export type Store = {
  isReady: boolean;
  setReady: (isReady: boolean) => void;

  active: number | null;
  setActive: (active: number | null) => void;

  isDrawing: boolean;
  setDrawing: (isDrawing: boolean) => void;

  regions: Array<Region>;
  setRegions: (regions: Array<Region>) => void;

  addRegion: (id: ID) => void;
};
