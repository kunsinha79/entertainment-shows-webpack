import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { ShowService } from './show.service';
import { of } from 'rxjs';
import { iClassifiedList, iShowDetails, iShowList } from '../interfaces/showList';
import { showDetailMock, showMock } from 'src/mocks/show.mock';

describe('ShowService', () => {
  let service: ShowService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowService, HttpClient],
    });
    service = TestBed.inject(ShowService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the show list', () => {
    spyOn(http, 'get').and.returnValue(of(showMock))
    service.getShowList().subscribe((response: iClassifiedList[]) => {
      expect(response).toEqual(showMock);
      expect(http.get).toHaveBeenCalled()
    })
  });

  it('should get the searched show list', () => {
    spyOn(http, 'get').and.returnValue(of(showMock))
    service.searchShows('drama').subscribe((response: iClassifiedList[]) => {
      expect(response).toEqual(showMock);
      expect(http.get).toHaveBeenCalled()
    })
  })

  it('should get the searched show by id', () => {
    spyOn(http, 'get').and.returnValue(of(showDetailMock))
    service.getShowById(1).subscribe((response: iShowDetails) => {
      expect(response).toEqual(showDetailMock);
      expect(http.get).toHaveBeenCalled()
    })
  })
});
