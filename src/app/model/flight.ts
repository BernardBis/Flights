import { Price } from 'src/app/model/price';
import { FlightDetails } from './flight-details';

export interface Flight {
  id: number;
  details: FlightDetails[];
  prices: Price[];
  distanceTimeTo: string;
  distanceTimeFrom: string;
  distanceDirectInfo: string;
  flightNumberFrom: string;
  flightNumberTo: string;
}
