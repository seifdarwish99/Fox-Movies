import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { menuData } from '../data';
import { ApiService } from '../../@core/services/api.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export enum Language {
  Deutsch = 'deu',
  English = 'en',
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    SidebarComponent,
    ToastModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [MessageService],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  loginButtom: string = 'login.loginButton';
  lang!: string;
  menuValue: boolean = false;
  menuIcon: string = 'pi pi-bars';

  get cardsData() {
    return menuData;
  }

  private subscription: Subscription = new Subscription();

  constructor(
    public translate: TranslateService,
    public api: ApiService,
    public router: Router,
    private messageService: MessageService,
  ) {
    (this.lang = localStorage.getItem('lang') || 'en'),
      this.translate.use(this.lang);
    // document.documentElement.dir = this.lang == 'en' ? 'ltr' : 'rtl
  }

  ngOnInit(): void {
    this.subscription.add(
      this.api.$isLoggedin.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('toast.success'),
            detail: this.translate.instant('toast.success1'),
          });
        } else {
          this.messageService.add({
            severity: 'contrast',
            summary: this.translate.instant('toast.logout'),
            detail: this.translate.instant('toast.logout1'),
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeLang(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
    window.location.reload();
  }

  openMenu() {
    this.menuValue = !this.menuValue;
    this.menuIcon = this.menuValue ? 'pi pi-times' : 'pi pi-bars';
  }

  closeMenu() {
    this.menuValue = false;
    this.menuIcon = 'pi pi-bars';
  }
  handleClick() {
    this.logOut();
    this.closeMenu();
  }

  logOut() {
    this.api.logout();
    this.router.navigate(['home']);
  }
}
