import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TenderListComponent } from './tender-list/tender-list.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { TenderFormComponent } from './tender-form/tender-form.component';
import { ROUTES } from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    TenderListComponent,
    TenderDetailsComponent,
    TenderFormComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
