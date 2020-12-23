import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { showDetailMock } from 'src/mocks/show.mock';
import { iShowDetails } from '../../interfaces/showList';
import { ShowService } from '../../services/show.service';

import { ShowDetailComponent } from './show-detail.component';

describe('ShowDetailComponent', () => {
  let component: ShowDetailComponent;
  let fixture: ComponentFixture<ShowDetailComponent>;
  let service: ShowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule],
      declarations: [ ShowDetailComponent ],
      providers: [ShowService, HttpClient, 
        {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => 1,
            },
          },
        },
      }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ShowService);
    spyOn(service, 'getShowById').and.callFake(
      (): Observable<iShowDetails> => of(showDetailMock)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getShowById', () => {
    component.ngOnInit();
    expect(service.getShowById).toHaveBeenCalledWith(1);
    expect(component.showDetails).toBe(showDetailMock);
  });

  it('should display data based on response', fakeAsync(() => {
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const dataColumns = bannerElement.querySelectorAll('.col-md-4');
    expect(dataColumns.length).toBe(2);

    const paraColumns = bannerElement.querySelectorAll('p');
    expect(paraColumns.length).toBe(6);
  }));
});
