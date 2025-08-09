import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  //or you can do it like this  -> http =inject(HttpClient)

  register(body: any): Observable<any> {
    return this.http.post(`${apiUrls.authServiceApi}register`, body);
  }

  login(body: any): Observable<any> {
    return this.http.post(`${apiUrls.authServiceApi}login`, body, {
      withCredentials: true,
    });
  }

  sendEmail(email: any): Observable<any> {
    return this.http.post(`${apiUrls.authServiceApi}send-email`, email);
  }

  resetPassword(body: any): Observable<any> {
    return this.http.post(`${apiUrls.authServiceApi}reset-password`, body);
  }

  // isLoggedIn() {
  //   return this.http.get<{ success: boolean }>(
  //     `${apiUrls.authServiceApi}is-logged`,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }

  logout() {
    return this.http.get(`${apiUrls.authServiceApi}logout`, {
      withCredentials: true,
    });
  }
}
