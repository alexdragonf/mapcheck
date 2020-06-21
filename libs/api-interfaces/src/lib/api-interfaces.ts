export interface Message {
  message: string;
}

export interface IStreet {
  id: number,
  fullName: string
}

export interface IHouse {
  id: number,
  streetId: number,
  house: string,
  lat: number,
  lon:number,
  zone: number,
  district: number
}