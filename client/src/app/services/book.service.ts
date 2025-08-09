import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  //or you can do it like this  -> http =inject(HttpClient)

  getBooks(): Observable<any> {
    return this.http.get(`${apiUrls.bookServiceApi}/`);
  }
  getBook(isbn13: string): Observable<any> {
    return this.http.get(`${apiUrls.bookServiceApi}/${isbn13}`);
  }
}
