import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from "rxjs";
import { environment } from '../../environments/environment';

 import data from '../../data/apps.json';

@Injectable({
  providedIn: 'root'
})
export default class ListService {

  constructor(private http: HttpClient) { }

  getData(pageNumber) : Observable<any>{

    if(isDevMode()){
      let startingIndex = pageNumber * environment.totalItemsPerPage - (environment.totalItemsPerPage );

      let totalPages = (data.length / environment.totalItemsPerPage >> 0)
      if(data.length % environment.totalItemsPerPage){
        totalPages += 1
      }

      let retrievePageData = {
        totalPages: totalPages,
        total: data.length,
        data: data.slice(startingIndex, environment.totalItemsPerPage)
      }

      return  of(retrievePageData);
    }
    else {
      let apiURL = environment.apiURL;
      return this.http.get(`${apiURL}/list?page=${pageNumber}`);
    }
  }


  getAllCategories(): Observable<any>{
    if(isDevMode()){
      let categoryList = []
      data.forEach(elem=> {
        elem.categories.forEach(category => {
          if(!categoryList.includes(category)){
            categoryList.push(category)
          }
        })
      })

      return  of(categoryList);
    }
    else {
      let apiURL = environment.apiURL;
      return this.http.get(`${apiURL}/categories`);
    }
  }

  filterByCategory(categoryArray, pageNumber) : Observable<any> {
    if(isDevMode()){
      let retrievePageData = {
        total: 0,
        totalPages: 0,
        data: []
      };

      let elementsWithCategory = data.filter( elem => {
        let hasCategory = false;
        elem.categories.forEach(category => {
          if(categoryArray.includes(category)){
            hasCategory = true
          }
        });
        return hasCategory
      });

      let startingIndex = pageNumber * environment.totalItemsPerPage - (environment.totalItemsPerPage );

      let totalPages = (elementsWithCategory.length / environment.totalItemsPerPage >> 0)
      if(elementsWithCategory.length % environment.totalItemsPerPage){
        totalPages += 1
      }

      retrievePageData.totalPages = totalPages
      retrievePageData.total = elementsWithCategory.length;
      retrievePageData.data = elementsWithCategory.slice(startingIndex, environment.totalItemsPerPage);

      return  of(retrievePageData);
    }
    else {
      let apiURL = environment.apiURL;
      let categoriesToURL = categoryArray.join('+').slice(0, -1);
      return this.http.get(`${apiURL}/list?page=${pageNumber}&categories=${categoriesToURL}`);
    }
  }

}
