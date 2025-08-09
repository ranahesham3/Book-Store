import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { confirmPasswordValidator } from '../../validators/confirm-password.validator.js';
import { AuthService } from '../../services/auth.service.js';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        alert('Logged in successfully');
        //to clear the form after creating a user
        this.loginForm.reset();

        // //to redirect to login page
        this.router.navigate(['/user']); // Replace with your route
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  register() {
    this.router.navigate(['/viewer/register']);
  }
}
