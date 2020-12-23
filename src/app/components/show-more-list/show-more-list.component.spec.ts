import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { showMock } from 'src/mocks/show.mock';
import { iClassifiedList } from '../../interfaces/showList';
import { ShowService } from '../../services/show.service';

import { ShowMoreListComponent } from './show-more-list.component';

describe('ShowMoreListComponent', () => {
  let component: ShowMoreListComponent;
  let fixture: ComponentFixture<ShowMoreListComponent>;
  let service: ShowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule],
      declarations: [ ShowMoreListComponent ],
      providers: [ShowService, HttpClient, 
        {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => 'drama',
            },
          },
        },
      }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreListComponent);
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

  it('should call getShowList', () => {
    component.ngOnInit();
    expect(service.getShowList).toHaveBeenCalled();
    expect(component.showCategorizedList).toEqual(showMock);
  });

  it('should display data based on response', fakeAsync(() => {
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const dataColumns = bannerElement.querySelectorAll('mat-card');
    expect(dataColumns.length).toBe(1);

    const paraColumns = bannerElement.querySelectorAll('h2');
    expect(paraColumns.length).toBe(1);
  }));
});
