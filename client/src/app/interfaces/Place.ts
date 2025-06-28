export interface Place {
  "place name": string;
  longitude: string;
  latitude: string;
  state: string;
  "state abbreviation": string;
}

export function isPlace(obj: any): obj is Place {
  return (
    typeof obj === 'object' &&
    typeof obj?.['place name'] === 'string' &&
    typeof obj?.longitude === 'string' &&
    typeof obj?.latitude === 'string' &&
    typeof obj?.state === 'string' &&
    typeof obj?.['state abbreviation'] === 'string'
  );
}
