import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowService } from '../../services/show.service';

import { ShowSearchComponent } from './show-search.component';

describe('ShowSearchComponent', () => {
  let component: ShowSearchComponent;
  let fixture: ComponentFixture<ShowSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      declarations: [ ShowSearchComponent ],
      providers: [ShowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when the search is invoked', () => {
    spyOn(component.searchCriteria, 'emit');
    component.searchTerm = 'girls';
    component.search();
    expect(component.searchCriteria.emit).toHaveBeenCalledWith('girls');
  });

  it('should emit when the clear is invoked', () => {
    spyOn(component.searchCriteria, 'emit');
    component.clearSearch();
    expect(component.searchCriteria.emit).toHaveBeenCalledWith('');
  });
});
