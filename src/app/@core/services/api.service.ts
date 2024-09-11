import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private isLogin = new BehaviorSubject<boolean>(this.getInitialLoginState());
  $isLoggedin = this.isLogin.asObservable();

  API_KEY = 'api_key=4b457a98b17afe2fa903e251697f7ee2';
  BASE_URL = 'https://api.themoviedb.org/3';
  API_URL = this.BASE_URL + '/discover/movie' + this.API_KEY;
  private readonly LOCAL_STORAGE_KEY = 'users';

  constructor(public _http: HttpClient) {}

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

  register(email: string, password: string): Observable<string> {
    return new Observable<string>((observer) => {
      const users = this.getUsers();
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        observer.error('Email already in use');
      } else {
        users.push({ email, password });
        this.saveUsers(users);
        observer.next('Registration successful');
        observer.complete();
      }
    });
  }

  private getUsers(): any[] {
    const users = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(users));
  }

  getUserByEmail(email: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const users = this.getUsers();
      const user = users.filter((user) => user.email === email);

      if (user.length > 0) {
        observer.next(user);
      } else {
        observer.next([]);
      }
      observer.complete();
    }).pipe(
      catchError((error) => {
        console.error('Error in getUserByEmail:', error);
        return throwError(() => new Error('Error fetching user by email'));
      })
    );
  }

  checkEmail(email: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const users = this.getUsers();
      const emailExists = users.some((user) => user.email === email);

      observer.next(emailExists);
      observer.complete();
    });
  }

  login() {
    this.isLogin.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.isLogin.next(false);
    localStorage.removeItem('isLoggedIn');
  }
  
  // localStorage

  private getInitialLoginState(): boolean {
    const storedState = localStorage.getItem('isLoggedIn');
    return storedState === 'true';
  }
}
