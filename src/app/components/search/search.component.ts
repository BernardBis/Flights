import { FlightsSearchFilters } from './model/flights-search-filters';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() eventSubmit: EventEmitter<FlightsSearchFilters> = new EventEmitter<FlightsSearchFilters>();

  public searchForm: FormGroup;
  public minDate: any;
  public maxDate: any;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initDateRange();
    this.initSearchForm();
  }

  private initDateRange(): void {
    this.minDate = { year: 2021, month: 6, day: 1 };
    this.maxDate = { year: 2021, month: 6, day: 6 };
  }

  private initSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      departureCity: this.formBuilder.control(undefined),
      arrivalCity: this.formBuilder.control(undefined),
      departureDate: this.formBuilder.control(undefined),
      arrivalDate: this.formBuilder.control(undefined)
    });
  }

  public onSubmit(): void {
    this.eventSubmit.emit(this.getFilters());
  }

  private getFilters(): FlightsSearchFilters {
    return {
      departureCity: this.searchForm.value.departureCity,
      arrivalCity: this.searchForm.value.arrivalCity,
      departureDate: this.searchForm.value.departureDate,
      arrivalDate: this.searchForm.value.arrivalDate
    } as FlightsSearchFilters;
  }

}
