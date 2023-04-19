import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { CalculatorComponent } from './components/calculatorRmb/calculator.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CalculatorBmiComponent } from './components/calculator-bmi/calculator-bmi.component';
import { CalculatorATComponent } from './components/calculator-at/calculator-at.component';
import { CalculatorTRComponent } from './components/calculator-tr/calculator-tr.component';
import { CalculatorCOLComponent } from './components/calculator-col/calculator-col.component';
import { BmiComponent } from './components/charts/bmi/bmi.component';
import { RmbComponent } from './components/charts/rmb/rmb.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutmeComponent},
  {path: "calculator", component: CalculatorComponent, canActivate: [AuthGuardService]},
  {path: "calculatorAT", component: CalculatorATComponent, canActivate: [AuthGuardService]},
  {path: "calculatorTR", component: CalculatorTRComponent, canActivate: [AuthGuardService]},
  {path: "statistics", component: StatisticsComponent},
  {path: "register", component: RegisterComponent},
  {path: "footer", component: FooterComponent},
  {path: "login", component: LoginComponent},
  {path: "header", component: HeaderComponent},
  {path: "userprofile", component: UserProfileComponent, canActivate: [AuthGuardService]},
  {path: "calculatorBMI", component: CalculatorBmiComponent, canActivate: [AuthGuardService]},
  {path: "calculatorCOL", component: CalculatorCOLComponent, canActivate: [AuthGuardService]},
  {path: "bmi", component: BmiComponent, canActivate: [AuthGuardService]},
  {path: "rmb", component: RmbComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
