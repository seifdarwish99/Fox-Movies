import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private isLogin = new BehaviorSubject<boolean>(this.getInitialLoginState());
  $isLoggedin = this.isLogin.asObservable();

  API_KEY = 'api_key=4b457a98b17afe2fa903e251697f7ee2';
  BASE_URL = 'https://api.themoviedb.org/3';
  API_URL = this.BASE_URL + '/discover/movie' + this.API_KEY;
  private DB_URL = 'http://localhost:3000';

  constructor(public _http: HttpClient) {}

  // localStorage

  private getInitialLoginState(): boolean {
    const storedState = localStorage.getItem('isLoggedIn');
    return storedState === 'true'; 
  }

  // Movies
  getTrending(): Observable<any> {
    return this._http.get(`${this.BASE_URL}/discover/movie?${this.API_KEY}`);
  }

  getPopularMovies(): Observable<any> {
    return this._http.get(`${this.BASE_URL}/tv/popular?${this.API_KEY}`);
  }

  getUpcoming(): Observable<any> {
    return this._http.get(`${this.BASE_URL}/movie/upcoming?${this.API_KEY}`);
  }

  getNowPlaying(): Observable<any> {
    return this._http.get(`${this.BASE_URL}/movie/now_playing?${this.API_KEY}`);
  }

  getTopRated(): Observable<any> {
    return this._http.get(`${this.BASE_URL}/movie/top_rated?${this.API_KEY}`);
  }

  getPopularActors(): Observable<any> {
    return this._http.get(`${this.BASE_URL}/person/popular?${this.API_KEY}`);
  }

  getTrendingActors(): Observable<any> {
    return this._http.get(
      `${this.BASE_URL}/trending/person/day?${this.API_KEY}`
    );
  }

  //Register and login

  registerUser(userDetails: any): Observable<any> {
    return this._http.post(`${this.DB_URL}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<any> {
    return this._http.get(`${this.DB_URL}/users?email=${email}`);
  }
  
  login() {
    this.isLogin.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.isLogin.next(false);
    localStorage.removeItem('isLoggedIn');    
  }


  checkEmail(email: string): Observable<any> {
    return this._http.get<any>(`${this.DB_URL}/users?email=${email}`);
  }
}
