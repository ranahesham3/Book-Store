import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean = true;
  url!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.url = this.router.url.split('/')[1];
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        alert('Logged out successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
