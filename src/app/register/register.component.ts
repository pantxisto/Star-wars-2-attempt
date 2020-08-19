import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashService } from '../services/flash.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  dataLoading: boolean;
  registerForm: FormGroup;
  constructor(
    private UserService: UserService,
    private FlashService: FlashService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataLoading = false;
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.dataLoading = true;
    this.UserService.Create(this.registerForm.value).then((response) => {
      if (response['success']) {
        this.FlashService.Success('Registration successful', true);
        this.router.navigate(['/login']);
      } else {
        this.FlashService.Error(response['message']);
        this.dataLoading = false;
      }
    });
  }
}
