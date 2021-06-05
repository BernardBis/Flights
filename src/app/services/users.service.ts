import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userState$: Subject<User> = new BehaviorSubject(null);

  private basePath: string;
  private userState: User;

  constructor(private http: HttpClient) {
    this.basePath = environment.baseRestPath;
  }

  public login(formData: FormGroup): void {
    this.userState = null;
    this.http.get<Array<User>>(`${this.basePath}/users`)
      .toPromise()
      .then((users) => {
        users.forEach((user) => {
          if (user.login === formData.controls.userLogin.value &&
            user.password === formData.controls.userPassword.value) {
            this.userState = user;
            this.userState$.next(user);
            return;
          }
        });
      })
      .catch((reason) => {
        console.log(reason);
        this.userState$.next(null);
      })
      .finally(() => {
        if (this.userState === null) {
          this.userState$.next(null);
        }
      })
  }

  public logout(): void {
    this.userState = null;
    this.userState$.next(null);
  }

  public getUserState = (): User => this.userState;
}
