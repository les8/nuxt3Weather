export interface Position {
  coords: PositionCoords;
  timestamp: number;
}

export interface PositionCoords {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
}
