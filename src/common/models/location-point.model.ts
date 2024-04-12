export class LocationPoint {
  public type: string = 'Point';
  public coordinates: number[] = [];

  constructor(latitude: number, longitude: number) {
    this.coordinates = [longitude, latitude];
  }
}
