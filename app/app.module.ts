import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ 
    AppComponent,
    WeatherComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

