import { Component } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [TranslateModule , RouterLink , RouterOutlet],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  movies: any[] = [];
  // movies: any
  imgPath = 'https://image.tmdb.org/t/p/w500'

  constructor(serviceApi: ApiService) {
    serviceApi.getTrending().subscribe((data) => {
      this.movies = data.results ;
    });
  }
}
