import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';


const API_URL = 'http://localhost:8080/api/test/product/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  username: string;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }


  addProduct(product): Observable<any> {
    const user = this.tokenStorageService.getUser();
    this.username = user.username;
    return this.http.post(API_URL + 'add', {
      name : product.name,
      byAdded: this.username,
      calories: product.calories,
      carbohydrates : product.carbohydrates,
      proteins : product.proteins,
      fat : product.fat,
      weight : product.weight,
      price : product.price,
      shop : product.shop
    }, httpOptions);
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
}