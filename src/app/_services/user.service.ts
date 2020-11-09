import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';
const API_URL_PASSWORD = 'http://localhost:8080/password/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getImage(): Observable<any> {
    return this.http.get(API_URL + 'user/storage/files/view');
  } 

  uploadImage(uploadImageData): Observable<any> {
    return this.http.post(API_URL + 'user/storage/upload', uploadImageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } 


  requestPassword(contact): Observable<any> {
    return this.http.post(API_URL_PASSWORD + 'forgot/' + contact.email, httpOptions);
  }

    //Make a call to Sprinf Boot to get the Image Bytes.
    
    

}

interface Images{
  id : number;
  name: string;
  type :string;
  data : any;
}