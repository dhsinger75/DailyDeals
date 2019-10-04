import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deal } from './deal';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  // Define the routes we are going to iteract with
  private publicDealsUrl = 'http://localhost:3001/api/deals/public';
  private privateDealsUrl = 'http://localhost:3001/api/deals/private';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Implement a method to get the public deals
  getPublicDeals(){
    return this.http
      .get<Deal[]>(this.publicDealsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a methoud to get the private deals
  getPrivateDeals(){
    return this.http
      .get<Deal[]>(this.privateDealsUrl, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse | any){
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
