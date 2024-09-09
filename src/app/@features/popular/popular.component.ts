import { Component } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export class PopularComponent {
  movies: any[] = [];
  imgPath = 'https://image.tmdb.org/t/p/w500';

  constructor(serviceApi: ApiService) {
    serviceApi.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }
}
