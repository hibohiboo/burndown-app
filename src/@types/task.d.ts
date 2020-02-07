type Point = {
  x: number;
  y: number;
}
export type Task = {
  id: number;
  title: string;
  point: number;
  sprint: number | null;
  tag: string;
  position: Point;
}
