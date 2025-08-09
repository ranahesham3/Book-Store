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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService],
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        alert('User created successfully');
        //to clear the form after creating a user
        this.registerForm.reset();
        // //to redirect to login page
        this.router.navigate(['/viewer/login']); // Replace with your route
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
}
