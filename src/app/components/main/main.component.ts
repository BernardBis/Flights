import { Component } from '@angular/core';
import { FlightsSearchFilters } from '../search/model/flights-search-filters';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  public filter: FlightsSearchFilters;

  public onSerachFilters(filter: FlightsSearchFilters): void {
    this.filter = filter;
  }

}
