import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-all-films',
  standalone: true,
  imports: [TranslateModule , RouterOutlet , RouterLink , RouterLinkActive],
  templateUrl: './all-films.component.html',
  styleUrl: './all-films.component.scss'
})
export class AllFilmsComponent {

}
