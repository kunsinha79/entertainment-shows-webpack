import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iShowDetails } from '../../interfaces/showList';
import { ShowService } from '../../services/show.service';



@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html'
})
export class ShowDetailComponent implements OnInit {

  id: number = 0;
  showDetails: iShowDetails|undefined;

  constructor( private route: ActivatedRoute, private showService: ShowService) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    
    this.showService.getShowById(this.id).subscribe(
      (res) => this.showDetails = res
    );
  }
}
