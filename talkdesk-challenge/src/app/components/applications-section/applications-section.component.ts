import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-applications-section',
  templateUrl: './applications-section.component.html',
  styleUrls: ['./applications-section.component.scss']
})
export class ApplicationsSectionComponent implements OnChanges {

  @Input() applicationsListData : any
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchChange: EventEmitter<any> = new EventEmitter<any>();

  applicationsList: any
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number

  constructor() { }

  ngOnChanges(): void  {
    console.log('Input')
    console.log(this.applicationsListData)

    this.applicationsList = this.applicationsListData.data
    this.totalElements = this.applicationsListData.total
    this.totalPages = this.applicationsListData.totalPages
    this.currentPage = this.applicationsListData.currentPage
    this.pageSize = environment.totalItemsPerPage

  }


  onPageChange(pageNumber) {
    this.pageChange.emit({pageNumber: pageNumber})
  }


  onSearchChange($event) {
    this.searchChange.emit({searchValue: $event.target.value})
  }
}
