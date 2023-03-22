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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculatorBmiComponent } from './components/calculator-bmi/calculator-bmi.component';
import { CalculatorsComponent } from './components/calculators/calculators.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutmeComponent},
  {path: "calculator", component: CalculatorComponent, canActivate: [AuthGuardService]},
  {path: "statistics", component: StatisticsComponent},
  {path: "register", component: RegisterComponent},
  {path: "footer", component: FooterComponent},
  {path: "login", component: LoginComponent},
  {path: "header", component: HeaderComponent},
  {path: "userprofile", component: UserProfileComponent, canActivate: [AuthGuardService]},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: "calculatorbmi", component: CalculatorBmiComponent, canActivate: [AuthGuardService]},
  {path: "calculators", component: CalculatorsComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
