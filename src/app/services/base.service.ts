import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Bar } from '../models/bar';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  // Get method
  get(): Observable<Bar> {
    let header = this.createHeader();
    return this.http.get<Bar>(`${environment.endPointURL}`, { headers: header })
      .pipe(
        retry(0),
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  // Create header
  createHeader(): HttpHeaders {
    let header = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
    return header;
  }

  handleError(error) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
