// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {map} from "rxjs/operators";
// import {Observable} from "rxjs";
// import {ProductCategory} from "../common/category";
// import { environment } from '../../environments/environment';

// const backend_url = environment.apiUrl + "/";


// @Injectable({
//   providedIn: 'root'
// })
// export class ProductCategoryService {
//   private baseUrl="http://localhost:8080//product-category";

//   constructor(private http: HttpClient) { }

//   getCategory() : Observable<ProductCategory[]> {
//     return this.http.get<categories>(this.baseUrl).pipe
//     (map(response => response._embedded.productCategories
//       )
//     );
//   }
// }

// interface categories {
//     _embedded:{
//       productCategories: ProductCategory[];
//     }
// }
