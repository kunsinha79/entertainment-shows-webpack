import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { iClassifiedList, iShowDetails, iShowList, iShowSearch } from '../interfaces/showList';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  API_URL: string = 'http://api.tvmaze.com';

  genres: Array<string> = ['Adventure', 'Comedy', 'Crime', 'Family', 'Children', 'Adult', 'DIY', 'Action', 'Horror'];
  
  categorizedShow: Array<iClassifiedList> = [];

  constructor(private http: HttpClient) { }

  getShowList(): Observable<iClassifiedList[]> {
    return this.http.get<iShowList[]>(`${this.API_URL}/shows`)
    .pipe(
      map((res: iShowList[]) => {

        return <iClassifiedList[]>this.categorizeList(res);

      }),
      catchError(err => 
        throwError(`An error has occurred ${err}`)
      )
    );
  }

  searchShows(data: String): Observable<iClassifiedList[]> {
    return this.http.get<iShowSearch[]>(`${this.API_URL}/search/shows?q=${data}`)
    .pipe(
      map((res: iShowSearch[]) => {
        return <iClassifiedList[]>this.categorizeList(res.map(r=> r.show));
      }),
      catchError( err => 
        throwError(`An error has occurred ${err}`)
      )
    );
  }

  getShowById(showId: Number): Observable<iShowDetails> {
    return this.http.get<iShowDetails>(`${this.API_URL}/shows/${showId}`)
    .pipe(
      map((res: iShowDetails) => res),
      catchError(err => 
        throwError(`An error has occurred ${err}`)
      )
    );
  }

  categorizeList( showList: Array<iShowList>): Array<iClassifiedList> {
    this.categorizedShow = [];

    this.genres.forEach(genre => { 
      this.categorizedShow.push(
        {
          genre: genre,
          shows: showList.filter(f => f.genres.includes(genre))
        }
      )
    });
    return <Array<iClassifiedList>>this.categorizedShow;
  }
}
