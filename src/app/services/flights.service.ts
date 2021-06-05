import { Airline } from './../model/airline';
import { Flight } from './../model/flight';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FlightsSearchFilters } from '../components/search/model/flights-search-filters';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = environment.baseRestPath;
  }

  public getFlights(filter: FlightsSearchFilters): Observable<Array<Flight>> {

    let querySource = `/flights`;
    let query = ``;

    if (filter !== undefined && filter !== null) {

      if (filter.departureDate !== null) {
        const departureDate = moment(filter.departureDate)
          .subtract(1, 'month').format('DD-MM-YYYY');

        query = query + `dateFrom_gte=${departureDate}`;
      }

      if (filter.arrivalDate !== null) {
        const arrivalDate = moment(filter.arrivalDate)
          .subtract(1, 'month').format('DD-MM-YYYY');

        if (query !== '') {
          query = query + `&`;
        }
        query = query + `dateFrom_lte=${arrivalDate}`;
      }

      if (filter.departureCity !== null && filter.departureCity !== '') {
        if (query !== '') {
          query = query + `&`;
        }
        query = query + `cityFrom=${filter.departureCity}`;
      }

      if (filter.arrivalCity !== null && filter.arrivalCity !== '') {
        if (query !== '') {
          query = query + `&`;
        }
        query = query + `cityTo=${filter.arrivalCity}`;
      }

    }

    if (query !== '') {
      querySource = querySource + '?';
    }

    querySource = querySource + query;

    return this.http.get<Array<Flight>>(`${this.basePath}${querySource}`);
  }

  public getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.basePath}/flights/${id}`);
  }

  public getAirlines(): Observable<Array<Airline>> {
    return this.http.get<Array<Airline>>(`${this.basePath}/airlines`);
  }

  public getAirlineById(id: number): Observable<Airline> {
    return this.http.get<Airline>(`${this.basePath}/airlines/${id}`);
  }
}
