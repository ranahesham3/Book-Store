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
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule],

  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers: [AuthService],
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit() {
    this.authService.sendEmail(this.forgetForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        //to clear the form after creating a user
        this.forgetForm.reset();
        // //to redirect to login page
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  cancel() {
    this.router.navigate(['/viewer/login']);
  }
}
