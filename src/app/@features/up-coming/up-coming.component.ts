import { Component } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';

@Component({
  selector: 'app-up-coming',
  standalone: true,
  imports: [],
  templateUrl: './up-coming.component.html',
  styleUrl: './up-coming.component.scss'
})
export class UpComingComponent {
  movies: any[] = [];
  imgPath = 'https://image.tmdb.org/t/p/w500'

  constructor(serviceApi: ApiService) {
    serviceApi.getUpcoming().subscribe((data) => {
      this.movies = data.results ;
    });
  }
}
