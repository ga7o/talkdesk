import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent implements OnChanges {

  @Input() categoriesList: any

  @Input()selected: any

  @Output() onSectionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(): void  {
    console.log('Input')
    console.log(this.categoriesList)
  }


  selectCategory(category){
    console.log('category-> ', category)
    this.onSectionClick.emit({category: category})
  }



}
