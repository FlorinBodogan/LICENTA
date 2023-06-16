import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArterialTension } from 'src/app/models/ArterialTension';
import { Bmi_result } from 'src/app/models/Bmi_result';
import { Colesterol } from 'src/app/models/Colesterol';
import { Rmb_result } from 'src/app/models/Rmb_result';
import { Triglycerides } from 'src/app/models/Triglycerides';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit{
  userRMB$: Observable<Rmb_result[]>;
  userBMI$: Observable<Bmi_result[]>;
  userTR$: Observable<Triglycerides[]>;
  userCol$: Observable<Colesterol[]>;
  userAT$: Observable<ArterialTension[]>;

  selectedTable: string = 'bmi';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userRMB$ = this.fetchRMBByID();
    this.userBMI$ = this.fetchBMIByID();
    this.userCol$ = this.fetchColByID();
    this.userAT$ = this.fetchATByID();
    this.userTR$ = this.fetchTRByID();
  }

  fetchRMBByID(): Observable<Rmb_result[]> {
    return this.userService.fetchAllRmb();
  }

  fetchBMIByID(): Observable<Bmi_result[]> {
    return this.userService.fetchAllBmi();
  }

  fetchColByID(): Observable<Colesterol[]> {
    return this.userService.fetchAllCOLWithParams();
  }

  fetchATByID(): Observable<ArterialTension[]> {
    return this.userService.fetchAllATWithParams();
  }

  fetchTRByID(): Observable<Triglycerides[]> {
    return this.userService.fetchAllTRWithParams();
  }
}
