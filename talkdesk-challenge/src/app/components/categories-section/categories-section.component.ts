/**
 * CategoriesSectionComponent
 *
 * The CategoriesSectionComponent logic definition
 *
 * @file   categories-section.component.component.ts
 * @author ga7o
 * @url https://github.com/ga7o
 */


import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent implements OnChanges {

  @Input() categoriesList: any

  @Input()selected: any

  @Output() onCategorySelectionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(): void  {

  }

  selectCategory(category){
    this.onCategorySelectionClick.emit({category: category})
  }



}
