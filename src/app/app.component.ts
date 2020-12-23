import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  currentUrl: string = '/showList';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // to watch for router's NavigationEnd to detect navigation to child pages
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
          this.currentUrl = this.router.url;
      });
  }

  /**
    This method checks whether current url is home page or not.
    AppComponent uses this as a flag to decide whetehr to show hoe icon or back icon
  **/
  isHome(): boolean {
    return this.currentUrl === '/showList';
  }
}

