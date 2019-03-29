import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BjyuMaterialModule } from './bjyu-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule, BjyuMaterialModule, FlexLayoutModule, HttpClientModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ DataService ]
})
export class AppModule { }
