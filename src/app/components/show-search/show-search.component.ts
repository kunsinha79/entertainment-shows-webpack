import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-search',
  templateUrl: './show-search.component.html'
})
export class ShowSearchComponent{

  @Output() searchCriteria = new EventEmitter<String>();
  searchTerm: String | undefined;


  search(): void {
    this.searchCriteria.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchCriteria.emit(this.searchTerm);
  }

}
