import { UsersService } from './services/users.service';
import { DictionaryService } from './services/dictionary.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpClientModule, } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AmountPipe } from './pipes/amount.pipe';
import { ImgComponent } from './components/img/img.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function DictionaryLoaderFactory(dictionaryService: DictionaryService) {
  return () => dictionaryService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsComponent,
    ListComponent,
    ReservationComponent,
    LoginComponent,
    ListItemComponent,
    AmountPipe,
    ImgComponent,
    PageNotFoundComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    UsersService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: DictionaryLoaderFactory,
      deps: [DictionaryService]
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
