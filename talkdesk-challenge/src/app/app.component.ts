/**
 * AppComponent
 *
 * The AppComponent logic definition
 *
 * @file   app.component.ts
 * @author ga7o
 * @url https://github.com/ga7o
 */

import {Component, OnInit} from '@angular/core';
import {ListService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Talkdesk-challenge';

  categoriesList: any
  appsList: any
  searchValue: string
  categoriesSelection: any = []


  /**
   * The AppComponent constructor.
   * @class AppComponent
   */
  constructor(private _listService: ListService) {

  }


  /**
   * Handles the initialization task
   * this will get the initial data for the applications list
   * and the categories list
   */
  ngOnInit(): void {

    // Loading the first elements of the list
    this.getApplicationsListByPage(1)

    this._listService.getAllCategories()
      .subscribe(
      data => {
        this.categoriesList = data
      },
      err => {
        console.log('Error loading categories')
      },
      () => {
      }
    )
  }

  /**
   * Handles the category selection event
   * @param {object} $event The category selection event.
   */
  onCategorySelectionClickEvent($event) {

    let selectedCategory = $event.category

    if(this.categoriesSelection.includes(selectedCategory)){
      this.categoriesSelection = this.categoriesSelection.filter((elem) => {
        return elem !== selectedCategory
      })
    }
    else {
      this.categoriesSelection.push(selectedCategory)
    }
    if( this.categoriesSelection.length > 0){
      this.getApplicationsByCategory(this.categoriesSelection, 1)
    }
    else {
      this.getApplicationsListByPage(1)
    }

  }

  /**
   * Handles the page selection event
   * @param {object} $event The page selection event.
   */
  onPageChangeEvent($event) {

    if(this.searchValue ){
      this.getApplicationBySearchTerm(this.searchValue, $event.pageNumber)
    }
    else if(this.categoriesSelection.length > 0) {
      this.getApplicationsByCategory(this.categoriesSelection, $event.pageNumber)
    }
    else {
      this.getApplicationsListByPage($event.pageNumber)
    }
  }

  /**
   * Handles the search input change event
   * @param {object} $event The search input change event
   */
  onSearchChangeEvent($event) {
    this.categoriesSelection = []
    this.searchValue =$event.searchValue
    this.getApplicationBySearchTerm(this.searchValue, 1)
  }

  /**
   * Get's all the list of applications for a specific page
   * by calling the list service
   * @param {number} pageNumber The page number to get
   * @return {object} The result is an object with the data, the total number of pages and elements.
   */
  getApplicationsListByPage(pageNumber) {
    this._listService.getData(pageNumber)
      .subscribe(
        data => {
          this.appsList = data;
        },
        err => {
          console.log('Error loading list')
        },
        () => {

        }
      )
  }

  /**
   * Get's all the list of applications for a specific search term in a page
   * by calling the list service
   * @param {string} searchTerm The search term.
   * @param {number} pageNumber The page number to get
   * @return {object} The result is an object with the data, the total number of pages and elements.
   */
  getApplicationBySearchTerm(searchValue, pageNumber) {

    this._listService.searchByTerm(searchValue, pageNumber)
      .subscribe(
        data => {
          this.appsList = data;
        },
        err => {
          console.log('Error loading list')
        },
        () => {

        }
      )


  }

  /**
   * Get the filtered data of a specific categories group (array) on a specific page
   * by calling the list service
   * @param {array} categoryArray The categories array list.
   * @param {number} pageNumber The page number.
   * @return {object} The result is an object with the data, the total number of pages and elements.
   */
  getApplicationsByCategory(categories, pageNumber) {
    this._listService.filterByCategory(categories, pageNumber).subscribe(
      data => {
        this.appsList = data
      },
      err => {
        console.log('Error loading filterByCategory')
      },
      () => {

      }
    )
  }
}
