import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { confirmPasswordValidator } from '../../validators/confirm-password.validator.js';
import { AuthService } from '../../services/auth.service.js';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
  providers: [AuthService],
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  token!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.resetForm = new FormGroup(
      {
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
    });
  }

  reset() {
    const payload = {
      password: this.resetForm.value.password,
      token: this.token,
    };
    this.authService.resetPassword(payload).subscribe({
      next: (res) => {
        alert(res.message);
        //to clear the form after creating a user
        this.resetForm.reset();
        // //to redirect to login page
        this.router.navigate(['/viewer/login']); // Replace with your route
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
