import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ShowSearchComponent } from './components/show-search/show-search.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { ShowMoreListComponent } from './components/show-more-list/show-more-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowSearchComponent,
    ShowListComponent,
    ShowDetailComponent,
    ShowErrorComponent,
    ShowMoreListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
