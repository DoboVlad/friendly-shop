import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticatedUser } from 'src/app/common/authenticatedUser';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { UpdateAccountComponent } from '../update-account/update-account.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  products: Product[];
  isfetching = false;
  user: AuthenticatedUser;
  constructor(private productService: ProductService,
              private userService: UserService,
              public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.listMyProducts();
    this.user = this.userService.user;
  }

  openDialogUpdate(){
    const dialogRef = this.dialog.open(UpdateAccountComponent);
  }

  listMyProducts(){
    this.isfetching = true;
    this.productService.getMyProductList().subscribe(
      data => {
        this.products = data
        this.isfetching = false;
      }
    );
  }
  deleteProduct(product: Product){
      this.isfetching = true;
      this.productService.deleteProduct(product).subscribe((data) => {
        console.log(data);
        this.router.navigate(['myAccount']);
        this.listMyProducts();
      })

  }
}
