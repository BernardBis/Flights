import { FlightsService } from './../../services/flights.service';
import { Flight } from './../../model/flight';
import { FlightsSearchFilters } from './../search/model/flights-search-filters';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() set searchFilters(filter: FlightsSearchFilters) {
    this.selectedFilters = filter;
    this.searchFlights();
  }

  public flights: Flight[];

  private selectedFilters: FlightsSearchFilters;

  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    this.initList();
  }

  private initList(): void {
    this.flightsService.getFlights(null).subscribe((data: Flight[]) => {
      this.flights = data;
    });
  }

  private searchFlights() {
    console.log('searchFlights -> ', this.selectedFilters);

    this.flightsService.getFlights(this.selectedFilters)
      .subscribe((data: Flight[]) => {
        this.flights = data;
        console.log(data);
      });
  }

}
