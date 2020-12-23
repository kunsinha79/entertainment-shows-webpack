import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowMoreListComponent } from './components/show-more-list/show-more-list.component';

const routes: Routes = [
  { path: 'showList', component: ShowListComponent },
  { path: '', redirectTo: 'showList', pathMatch: 'full' },
  { path: 'showDetails/:id', component: ShowDetailComponent },
  { path: 'showMoreList/:genre', component: ShowMoreListComponent },
  { path: '**', component: ShowErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
