import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpLoaderFactory } from './app.module';
import { HttpClient } from '@angular/common/http';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

const TRANSLATIONS_ES = require('../assets/i18n/es.json');
const TRANSLATIONS_EN = require('../assets/i18n/en.json');

describe('AppComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ListUsersComponent,
        CreateUserComponent,
        ViewUserComponent
      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,

        DlDateTimePickerDateModule,

        NgbModule.forRoot(),

        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [ TranslateService ]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should load translations', async(() => {
    spyOn(translate, 'getBrowserLang').and.returnValue('es');
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    // El DOM deberia estar vacio porque no se habran renderizado las traducciones
    expect(compiled.querySelector('.navbar-brand').textContent).toEqual('');

    http.expectOne('/assets/i18n/es.json').flush(TRANSLATIONS_ES);
    http.expectNone('/assets/i18n/en.json');

    // Se comprueba que no hay peticiones pendientes
    http.verify();
    fixture.detectChanges();

    // El contenido deberia traducirse al español
    expect(compiled.querySelector('.navbar-brand').textContent).toEqual(TRANSLATIONS_ES.app.title);

    // Se hace la peticion de cambiar el idioma a ingles
    translate.use('en');
    http.expectOne('/assets/i18n/en.json').flush(TRANSLATIONS_EN);

    // Se comprueba que no hay peticiones pendientes
    http.verify();

    // El contenido no deberia haber cambiado de traduccion aun
    expect(compiled.querySelector('.navbar-brand').textContent).toEqual(TRANSLATIONS_ES.app.title);

    fixture.detectChanges();
    // El contenido deberia estar traducido al ingles ahora
    expect(compiled.querySelector('.navbar-brand').textContent).toEqual(TRANSLATIONS_EN.app.title);
  }));
});
