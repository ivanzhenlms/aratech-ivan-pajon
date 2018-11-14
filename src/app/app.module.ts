import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserManagementService } from './shared/services/user/user-management-service.service';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { FormManagementService } from './shared/services/form/form-management.service';
import { ModalInfoComponent } from './components/modals/modal-info/modal-info.component';
import { ModalManagementService } from './shared/services/modal/modal-management.service';
registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'view-user/:id', component: ViewUserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ViewUserComponent,
    CreateUserComponent,
    ModalInfoComponent
  ],
  entryComponents: [
    ModalInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,

    DlDateTimePickerDateModule,

    NgbModule.forRoot(),

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    UserManagementService,
    FormManagementService,
    ModalManagementService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
