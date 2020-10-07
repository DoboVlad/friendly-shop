import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedUser } from 'src/app/common/authenticatedUser';
import { UserProducts } from 'src/app/common/userProducts';
import { UserService } from 'src/app/service/user.service';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number;
  products: UserProducts[];
  isfetching = false;
  authenticatedUser: AuthenticatedUser;
  imageUrl: string;
  totalProducts: number = 10;
  productsPerPage = 3;
  pageSizeOptions = [3, 6];
  currentPage= 1;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              public userService: UserService) { }

  ngOnInit(): void {
    this.authenticatedUser = this.userService.user;
    this.activatedRoute.paramMap.subscribe(() => {
      this.listProducts(this.productsPerPage, this.currentPage);
    });
  }

  listProducts(productsPerPage?: number, currentPage?: number){
    this.isfetching = true;
    this.productService.getProductList(productsPerPage, currentPage).subscribe(
      data => {
        this.products = data;
        this.isfetching = false;
      }
    );
  }

  OnChangedPage(pageData: PageEvent) {
    this.isfetching = true;
    this.productsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.listProducts(this.productsPerPage, this.currentPage);
  };
}
