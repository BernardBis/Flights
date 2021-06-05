import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private userService: UsersService,
    private readonly formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public Login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm);
      this.modalService.dismissAll();
    }
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      userLogin: this.formBuilder.control(undefined, [Validators.required, Validators.email]),
      userPassword: this.formBuilder.control(undefined, [Validators.required])
    });
  }

}
