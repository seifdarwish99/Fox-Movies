import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../@core/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  map,
  of,
  Observable,
} from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&#])(?=[^A-Z]*[A-Z]).{8,30}$/
      ),
    ]),
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.emailTakenValidator.bind(this)]
    ),
  });

  emailTakenValidator(
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> {
    if (!control.value) {
      return of(null);
    }

    const emailValue = control.value.trim().toLowerCase();

    return this.api.checkEmail(emailValue).pipe(
      map((response: string) => {
        if (response && response.length > 0) {
          return { checkEmail: true };
        } else {
          return null;
        }
      })
    );
  }

  constructor(private router: Router, private api: ApiService) {}

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.api.registerUser(this.registerForm.value).subscribe();
    this.router.navigate(['/login']);
  }
}
