import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {UserProducts} from "../common/userProducts";
import {map} from "rxjs/operators";
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

const backend_url = environment.apiUrl + "/";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = backend_url + "products";
  private getMyProductsUrl=backend_url + "myProducts";
  private getAllProductsUrl=backend_url + "allProducts";
  products: Product[] = [];

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getMyProductList(): Observable<Product[]>{
      return this.httpClient.get<GetResponse>(this.getMyProductsUrl, {
        headers: {
          'Authorization' : 'Bearer ' + this.userService.token
        }
      }).pipe(
        map(response => response.products)
      );
  }

  getProductList(productsPerPage: number, currentPage: number): Observable<UserProducts[]>{
    const queryParams= `?pageSize=${productsPerPage}&page=${currentPage}`;
    return this.httpClient.get<GetResponseProducts>(this.getAllProductsUrl + queryParams, {
      headers: {
        'Authorization' : 'Bearer ' + this.userService.token
      }
    }).pipe(map (data => data.products));
}



  addProduct(product: Product, image: File){
    const productData = new FormData();
    productData.append('name', product.name);
    productData.append('_id', product._id as unknown as string);
    productData.append('description', product.description);
    productData.append('image', image, product.name);
    productData.append('price', product.price as unknown as string);
    this.httpClient.post<Product>(this.baseUrl, productData, {
      headers: {
        'Authorization' : 'Bearer ' + this.userService.token
      }
    }).subscribe(
      (responseData) => {
        console.log(responseData);
      }
    )
  }

  deleteProduct(product: Product){
    return this.httpClient.delete(this.baseUrl + '/' + product._id, {
        headers: {
          'Authorization' : 'Bearer ' + this.userService.token
        }
      });
  }
}
interface GetResponse {
  message: string,
  products: Product[];
}

interface GetResponseProducts {
  products: UserProducts[];
}
