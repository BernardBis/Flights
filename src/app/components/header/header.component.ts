import { UsersService } from './../../services/users.service';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public user: User;

  private subscriptions: Subscription[] = [];

  constructor(
    private modalService: NgbModal,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public showModalForm(): void {
    this.modalService.open(LoginComponent);
  }

  public getUser = (): User => this.user;

  public logout = (): void => this.usersService.logout();

  private initSubscriptions() {
    this.subscriptions.push(this.usersService.userState$.subscribe((user: User) => {
        this.user = user;
    }));
  }
}
