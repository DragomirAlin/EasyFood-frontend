import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {
  form: any = {};


  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }


onSubmit(){
  this.userService.requestPassword(this.form).subscribe();
  this.reloadPage();
}

reloadPage() {
  window.location.reload();
}

}
