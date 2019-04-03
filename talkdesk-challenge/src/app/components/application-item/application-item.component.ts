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
    console.log('Input')
    console.log(this.application)

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
