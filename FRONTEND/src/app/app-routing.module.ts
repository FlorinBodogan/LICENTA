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
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { BanGuardService } from './services/ban-guard.service';

const routes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutmeComponent, canActivate: [BanGuardService]},
  {path: "calculator", component: CalculatorComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "calculatorAT", component: CalculatorATComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "calculatorTR", component: CalculatorTRComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "statistics", component: StatisticsComponent, canActivate: [BanGuardService]},
  {path: "register", component: RegisterComponent},
  {path: "footer", component: FooterComponent},
  {path: "login", component: LoginComponent},
  {path: "header", component: HeaderComponent},
  {path: "userprofile", component: UserProfileComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "calculatorBMI", component: CalculatorBmiComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "calculatorCOL", component: CalculatorCOLComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "bmi", component: BmiComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "rmb", component: RmbComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "history", component: UserHistoryComponent, canActivate: [AuthGuardService, BanGuardService]},
  {path: "ControlPanel", component: AdminPageComponent, canActivate: [AuthGuardService, AdminGuardService, BanGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
