import {  EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/SignupRequestPayload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request-payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn:EventEmitter<boolean> =new EventEmitter();
  @Output() username:EventEmitter<String> =new EventEmitter();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8081/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequest: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:8081/api/auth/login', loginRequest).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('expiresAt', data.expireAt);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('username', data.username);

      this.loggedIn.emit(true);
      this.username.emit(data.username);

      return true;
    }));
  }

  refreshToken() {

    const refreshTokenPayload = {
      refreshToken:this.getRefreshToken(),
      username:this.getUserName()

    };

    return this.http.post<LoginResponse>('http://localhost:8081/api/auth/refresh/token'
      , refreshTokenPayload).pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expireAt);
      }))
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
