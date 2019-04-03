import {Component, OnInit} from '@angular/core';
import {ListService} from './services';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'takdesk-challenge';

  categoriesList: any

  appsList: any

  searchValue: string

  categoriesSelection: any = []

  constructor(private _listService: ListService) {

  }

  ngOnInit(): void {

    // Loading the first elements of the list
    this.getApplicationsListByPage(1)

    this._listService.getAllCategories()
      .subscribe(
      data => {
        console.log(`getAllCategories:`);
        console.log(data);
        this.categoriesList = data
      },
      err => {
        console.log('Error loading categories')
      },
      () => {
        console.log('End of getting categories')
      }
    )
  }


  onSectionClickEvent($event) {
    alert('onSectionClick '+ $event.category )
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

  onPageChangeEvent($event) {
    alert('onPageChangeEvent '+ $event.pageNumber)

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

  onSearchChangeEvent($event) {
    console.log($event.searchValue)
    this.searchValue =$event.searchValue
    this.getApplicationBySearchTerm(this.searchValue, 1)
  }

  getApplicationsListByPage(pageNumber) {
    this._listService.getData(pageNumber)
      .subscribe(
        data => {
          console.log(`getData:`);
          console.log(data);
          this.appsList = data;
        },
        err => {
          console.log('Error loading list')
        },
        () => {
          console.log('End of getting list')
        }
      )
  }

  getApplicationBySearchTerm(searchValue, pageNumber) {

    this._listService.searchByTerm(searchValue, pageNumber)
      .subscribe(
        data => {
          console.log(`getData:`);
          console.log(data);
          this.appsList = data;
        },
        err => {
          console.log('Error loading list')
        },
        () => {
          console.log('End of getting list')
        }
      )


  }

  getApplicationsByCategory(categories, pageNumber) {
    this._listService.filterByCategory(categories, pageNumber).subscribe(
      data => {
        console.log(`filterByCategory:`)
        console.log(data)
        this.appsList = data
      },
      err => {
        console.log('Error loading filterByCategory')
      },
      () => {
        console.log('End of getting filterByCategory')
      }
    )
  }
}
