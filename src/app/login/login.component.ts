import { Component, NgZone, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dataLoading: boolean;
  loginForm: FormGroup;
  constructor(
    private AuthenticationService: AuthenticationService,
    private FlashService: FlashService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataLoading = false;
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.AuthenticationService.ClearCredentials();
  }

  onSubmit() {
    this.dataLoading = true;
    this.AuthenticationService.Login(
      this.loginForm.value.username,
      this.loginForm.value.password,
      (response) => {
        if (response.success) {
          this.AuthenticationService.SetCredentials(
            this.loginForm.value.username,
            this.loginForm.value.password
          );
          this.router.navigate(['/ships']);
        } else {
          this.FlashService.Error(response.message);
          this.dataLoading = false;
        }
      }
    );
  }
}
