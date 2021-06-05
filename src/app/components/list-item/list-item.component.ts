import { Flight } from './../../model/flight';
import { Component, OnInit, Input } from '@angular/core';
import { FlightDetails } from 'src/app/model/flight-details';
import { Price } from 'src/app/model/price';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() flight?: Flight;

  public departureDetails: FlightDetails;
  public arrivalDetails: FlightDetails;
  public price: Price;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.departureDetails = this.flight.details.find(details => details.order === 1);
    this.arrivalDetails = this.flight.details.find(details => details.order === 2);
    this.price = this.flight.prices.find(p => p !== undefined);
  }

  public showDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }
}
