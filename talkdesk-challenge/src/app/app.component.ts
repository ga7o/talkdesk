import {Component, OnInit} from '@angular/core';
import {ListService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'takdesk-challenge';

  categoriesList: any

  constructor(private _listService: ListService) {

  }

  ngOnInit(): void {
    this._listService.getData(1).subscribe(
      data => {

        console.log(`getData:`)
        console.log(data)
      },
      err => {
        console.log('Error loading list')
      },
      () => {
        console.log('End of getting list')
      }
    )


    this._listService.getAllCategories()
      .subscribe(
      data => {
        console.log(`getAllCategories:`)
        console.log(data)
        this.categoriesList = data
      },
      err => {
        console.log('Error loading categories')
      },
      () => {
        console.log('End of getting categories')
      }
    )
    let categories = ["Voice Analytics"]

    this._listService.filterByCategory(categories, 1).subscribe(
      data => {
        console.log(`filterByCategory:`)
        console.log(data)
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
