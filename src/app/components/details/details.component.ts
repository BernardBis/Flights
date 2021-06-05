import { UsersService } from './../../services/users.service';
import { Flight } from './../../model/flight';
import { FlightsService } from './../../services/flights.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FlightDetails } from 'src/app/model/flight-details';
import { Price } from 'src/app/model/price';
import { User } from 'src/app/model/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationComponent } from '../reservation/reservation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public flight: Flight;
  public departureDetails: FlightDetails;
  public arrivalDetails: FlightDetails;
  public price: Price;
  public isLoaded: boolean;
  public user: User;

  private subscriptions: Subscription[] = [];

  constructor(
    private flightService: FlightsService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initSubscriptions();

    this.isLoaded = false;
    this.route.paramMap.subscribe((param: Params) => {
      this.flightService.getFlightById(param.get('id')).subscribe((data) => {

        this.flight = data;
        this.departureDetails = this.flight.details.find(details => details.order === 1);
        this.arrivalDetails = this.flight.details.find(details => details.order === 2);
        this.price = this.flight.prices.find(p => p !== undefined);

        this.isLoaded = true;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public getUser = (): User => this.user;

  public setReservation(): void {
    this.modalService.open(ReservationComponent);
  }

  private initSubscriptions(): void {
    this.subscriptions.push(this.usersService.userState$.subscribe((user: User) => {
      this.user = user;
    }));
  }

}
