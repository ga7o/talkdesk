import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from "rxjs";
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

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

      let sortedData = this.sortByPlanPrice(data);

      let retrievePageData = {
        totalPages: totalPages,
        total: sortedData.length,
        data: sortedData.slice(startingIndex, environment.totalItemsPerPage)
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

      categoryList = _.sortBy(categoryList)

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

      let sortedData = this.sortByPlanPrice(data);

      let elementsWithCategory = sortedData.filter( elem => {
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

  private sortByPlanPrice(data): any{

    let orderData = _.sortBy(data,[(elem)=> {
      return _.sumBy(elem.subscriptions, plan => {
        return plan.price
      } )
    }])

    return orderData

  }

}
