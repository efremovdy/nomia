import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { SectionComponent } from './components/section/section.component';
import { ItemComponent } from './components/item/item.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'section', component: SectionComponent },
  { path: 'item', component: ItemComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
