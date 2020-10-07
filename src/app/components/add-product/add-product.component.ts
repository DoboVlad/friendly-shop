import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, AsyncValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';
import { mimeType } from '../../common/mimeType';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  sellProducts : FormGroup;
  contactType: string;
  product: Product;
  file: File;
  imagePreview: string;
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.sellProducts = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required),
        'image': new FormControl(null, {validators: [], asyncValidators: [mimeType]}),
        'description': new FormControl(null)
    });
  }

  contact(contactType: string){
    this.contactType = contactType;
  }

  onSubmit(){
    this.product = this.sellProducts.value;
    console.log(this.sellProducts);
    this.productService.addProduct(this.product, this.sellProducts.value.image);
    this.router.navigate(['products']);
  }

  onFileSelected(event: Event) {
    if(((event.target) as HTMLInputElement).files.length > 0){ // check if at least 1 file is selected
      this.file = ((event.target) as HTMLInputElement).files[0];
      this.sellProducts.patchValue({image : this.file});
      this.sellProducts.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(this.file);
    }
  }

}
