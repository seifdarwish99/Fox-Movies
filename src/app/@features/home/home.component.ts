import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../@core/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  startForm: FormGroup = new FormGroup({
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/),
    ]),
  });

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, public api: ApiService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.api.$isLoggedin.subscribe((isLoggedIn)=>{
        this.isLoggedIn = isLoggedIn
      })
    )
  }

  submit() {
    if (this.startForm.invalid) {
      this.startForm.markAllAsTouched();

      return;
    }
    this.router.navigate(['/register']);
  }
}
