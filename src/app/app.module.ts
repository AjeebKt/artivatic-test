import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from './core/services/response.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';
import { GlobalDataService } from './core/services/global-data.service';
import { AuthenticComponent } from './authentic/authentic.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule, FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2nJjGEfc6v-8Xwov_cx82CL2EvB0Bl3M',
      libraries: ['places']
    })
  ],
  providers: [
    GlobalDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
