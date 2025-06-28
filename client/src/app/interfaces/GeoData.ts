import { Place, isPlace } from "./Place";


export interface GeoData {
    "country": string,
    "country abbreviation": string,
    "post code": string,
    places: Place[]
}

export function isGeoData(obj: any): obj is GeoData {
  return (
    typeof obj === 'object' &&
    typeof obj?.country === 'string' &&
    typeof obj?.['country abbreviation'] === 'string' &&
    typeof obj?.['post code'] === 'string' &&
    Array.isArray(obj?.places) &&
    obj.places.every(isPlace)
  );
}
