import { Component, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent implements AfterContentInit {

  @Input() categoriesList: any

  @Output() onSectionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngAfterContentInit(): void  {
    console.log('Input')
    console.log(this.categoriesList)

  }

}
