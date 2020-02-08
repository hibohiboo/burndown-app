export type Sprint = {
  id: number;
  start: string;
  end: string | null;
  planningCapacity: number;
  resultCapacity: number;
  velocity: number;
};
