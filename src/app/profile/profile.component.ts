import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UserService } from '../_services/user.service';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private token: TokenStorageService, private httpClient: HttpClient, private userService : UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }

  public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }

//Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }


      //Gets called when the user clicks on retieve image button to get the image from back end

getImage() {
//Make a call to Sprinf Boot to get the Image Bytes.
// this.httpClient.get('http://localhost:8080/api/user/file/view')
//   .subscribe(
//     res => {
//       this.retrieveResonse = res;
//       this.base64Data = this.retrieveResonse.data;
//       console.log(this.base64Data);
//       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
//     }
//   );
this.userService.getImage().subscribe((res ) => {
  this.retrieveResonse = res;
  this.base64Data = this.retrieveResonse.data;
  console.log(this.base64Data);
  this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
})

}
}





  
