export type Coordinates = { lat: number; lng: number };

export const calculateDistance = (start: Coordinates, end: Coordinates): number => {
  const dx = start.lat - end.lat;
  const dy = start.lng - end.lng;
  return Math.sqrt(dx * dx + dy * dy);
};
