import { GeoJSON, Polygon } from "geojson";
export interface Message {
  message: string;
}

export interface StreetInterface {
  id: number,
  fullName: string
}

export interface HouseInterface {
  id: number,
  streetId: number,
  house: string,
  lat: number,
  lon:number,
  zone: number,
  district: number
}

export interface DistrictInterface {
  id: number,
  name: string,
  geojson: GeoJSON.Feature<Polygon>,
  parentId: number,
  districtType: number
  polygon: GeoJSON.Polygon,
<<<<<<< Updated upstream
  zone: number,
=======
  // zone: number,
>>>>>>> Stashed changes
  comment: string
}