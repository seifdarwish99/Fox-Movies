import { Component } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent {
  actors: any[] = [];
  trendingActors:any[] = []
  // movies: any
  imgPath = 'https://image.tmdb.org/t/p/w500'

  constructor(serviceApi: ApiService) {
    serviceApi.getPopularActors().subscribe((data) => {
      this.actors = data.results ;
    });
    serviceApi.getTrendingActors().subscribe((data) => {
      this.trendingActors = data.results ;
    });
  }
}
