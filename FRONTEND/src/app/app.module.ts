import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { CalculatorComponent } from './components/calculatorRmb/calculator.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CalculatorBmiComponent } from './components/calculator-bmi/calculator-bmi.component';
import { CalculatorATComponent } from './components/calculator-at/calculator-at.component';
import { CalculatorTRComponent } from './components/calculator-tr/calculator-tr.component';
import { CalculatorCOLComponent } from './components/calculator-col/calculator-col.component';
import { BmiComponent } from './components/charts/bmi/bmi.component';
import { RmbComponent } from './components/charts/rmb/rmb.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';



const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    AboutmeComponent,
    CalculatorComponent,
    StatisticsComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    UserProfileComponent,
    CalculatorBmiComponent,
    CalculatorATComponent,
    CalculatorTRComponent,
    CalculatorCOLComponent,
    BmiComponent,
    RmbComponent,
    UserHistoryComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    [NgbModule]
  ],
  exports: [
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService,
    multi: true
  }, 
  CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
