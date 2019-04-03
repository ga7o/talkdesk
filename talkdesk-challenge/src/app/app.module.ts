import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// App generated imports
import { AppComponent } from './app.component';
import { ApplicationItemComponent } from './components/application-item/application-item.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { ApplicationsSectionComponent } from './components/applications-section/applications-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationItemComponent,
    CategoriesSectionComponent,
    ApplicationsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
