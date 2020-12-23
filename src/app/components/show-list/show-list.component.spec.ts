import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ShowListComponent } from './show-list.component';
import { ShowService } from '../../services/show.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { iClassifiedList } from '../../interfaces/showList';
import { Observable, of } from 'rxjs';
import { showMock } from 'src/mocks/show.mock';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ShowSearchComponent } from '../show-search/show-search.component';

describe('ShowListComponent', () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;
  let service: ShowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule],
      declarations: [ ShowListComponent, ShowSearchComponent ],
      providers: [ ShowService, HttpClient ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ShowService);
    spyOn(service, 'getShowList').and.callFake(
      (): Observable<Array<iClassifiedList>> => of(showMock)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getShowList on init', () => {
    component.ngOnInit();
    expect(service.getShowList).toHaveBeenCalled();
    expect(component.showCategorizedList).toBe(showMock);
  });

  it('should display data based on response', fakeAsync(() => {
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const cards = bannerElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(1);

    const categoryHeading = bannerElement.querySelectorAll('h2');
    expect(categoryHeading.length).toBe(1);
  }));

  it('should not display Show More button', fakeAsync(() => {
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const buttons = bannerElement.querySelectorAll('button');
    expect(buttons.length).toBe(1);
    expect(buttons[0].innerText).not.toEqual('Show More')
  }));

  it('should call searchShows when search is called with data', () => {
    spyOn(service, 'searchShows').and.callFake(
      (): Observable<Array<iClassifiedList>> => of(showMock)
    );
    component.search('dogs');
    expect(service.searchShows).toHaveBeenCalledWith('dogs');
  });

  it('should call search when searchComponent emits an event', () => {
    spyOn(component, 'search');
    const de: DebugElement = fixture.debugElement;
    const detail = de.query(By.directive(ShowSearchComponent));
    const cmpDetail = detail.componentInstance;
    cmpDetail.searchCriteria.emit('dogs');
    expect(component.search).toHaveBeenCalledWith('dogs');
  });

});
