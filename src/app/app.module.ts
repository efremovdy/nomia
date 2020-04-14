import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SectionComponent } from './components/section/section.component';
import { ItemComponent } from './components/item/item.component';
import { LcgBoxModule } from './lcg-box/lcg-box.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SectionComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LcgBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
