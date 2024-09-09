import { Component } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss',
})
export class NowPlayingComponent {
  movies: any[] = [];
  imgPath = 'https://image.tmdb.org/t/p/w500';

  constructor(serviceApi: ApiService) {
    serviceApi.getNowPlaying().subscribe((data) => {
      this.movies = data.results;
    });
  }
}
