import { Airline } from './../model/airline';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private basePath: string;

  private airlines: Airline[] = [];

  constructor(private http: HttpClient) {
    this.basePath = environment.baseRestPath;
  }

  public load(): void {
    this.http.get<Array<Airline>>(`${this.basePath}/airlines`).subscribe(
      result => {
        this.airlines = result;
      },
      error => {
        console.error('DictionaryService -> load()', error);
      }
    );
  }

  public getAirlineById(airlineId: number): Airline {
    return this.airlines.find((value: Airline) => value.id !== undefined && value.id === airlineId);
  }

  public getAll = (): Airline[] => this.airlines;
}
