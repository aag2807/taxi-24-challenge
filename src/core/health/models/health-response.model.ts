import { THealthResponseValue } from '../types/health-response.type';

export class HealthResponse {
  public api: THealthResponseValue = 'N/A';
  public database: THealthResponseValue = 'N/A';

  constructor(api: THealthResponseValue, database: THealthResponseValue) {
    this.api = api;
    this.database = database;
  }
}