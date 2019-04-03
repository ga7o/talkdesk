/**
 * ApplicationItemComponent
 *
 * The ApplicationItemComponent logic definition
 *
 * @file   application-item.component.component.ts
 * @author ga7o
 * @url https://github.com/ga7o
 */

import { Component, AfterContentInit, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-application-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.scss']
})
export class ApplicationItemComponent implements AfterContentInit {

  @Input() application : any

  subscriptions:any = []

  constructor() { }

  ngAfterContentInit(): void  {

    this.application.subscriptions
      .forEach((subscription) => {
        let subs = {
          "name": subscription.name,
          "price": subscription.price + '€'
        }
        if(subscription.price === 0){
          subs.price = 'Free'
        }
        this.subscriptions.push(subs)
      })
  }
}
