import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router , RouterLink } from '@angular/router';
import { ApiService } from '../../@core/services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink , TranslateModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private _api: ApiService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('toast.error'),
        detail: this.translate.instant('toast.error1'),
      });
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('userPassword')?.value;
    this._api.getUserByEmail(email as string).subscribe((res) => {
      if (res.length > 0 && res[0].password === password) {     
        this.router.navigate(['AllFilms/movies']);
        this._api.login();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('toast.error'),
          detail: this.translate.instant('toast.error1'),
        });
      }
    });
  }
}