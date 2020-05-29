export type Unique = number | string;

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
  id: Unique;
  closed: boolean;
  points: Point[];
  texts: Text[];
};

