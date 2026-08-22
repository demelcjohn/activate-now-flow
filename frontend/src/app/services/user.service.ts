import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user1';
  private activationUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  submitActivation(formData: any): Observable<any> {
    return this.http.post(this.activationUrl, formData);
  }
}
