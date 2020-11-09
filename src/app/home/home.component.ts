import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { TokenStorageService } from '../_services/token-storage.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser : any;

  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }




  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      this.roles = this.tokenStorage.getUser().roles;
      
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      
      
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  

  reloadPage() {
    window.location.reload();
  }
}