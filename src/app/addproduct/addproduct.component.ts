import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service'
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  form: any = {};
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.addProduct(this.form).subscribe(
      data => {
      
     
      }
    );
  }


}
