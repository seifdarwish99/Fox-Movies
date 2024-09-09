import { Component } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.scss'
})
export class TopRatedComponent {
  movies: any[] = [];
  imgPath = 'https://image.tmdb.org/t/p/w500'

  constructor(serviceApi: ApiService) {
    serviceApi.getTopRated().subscribe((data) => {
      this.movies = data.results ;
    });
  }
}
