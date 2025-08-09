import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  //or you can do it like this  -> http =inject(HttpClient)

  addBook(body: any): Observable<any> {
    return this.http.post(`${apiUrls.cartServiceApi}/`, body, {
      withCredentials: true,
    });
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${apiUrls.cartServiceApi}/`, {
      withCredentials: true,
    });
  }
  deleteBook(body: any): Observable<any> {
    return this.http.post(`${apiUrls.cartServiceApi}/delete`, body, {
      withCredentials: true,
    });
  }
}
