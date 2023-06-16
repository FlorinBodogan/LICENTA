import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, catchError, first, switchMap, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  faEdit = faEdit;
  faDeleteLeft = faDeleteLeft;

  users$: Observable<User[]>;

  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  updateForm: FormGroup;  
  selectedUserName: string;
  showForm: boolean = false;
  
  constructor(private adminService: AdminService, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateForm = this.createFormGroup();
    this.users$ = this.fetchUsers();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.minLength(3)]),
      email: new FormControl("", [Validators.email]),
    });
  }

  updateUser(userName: string, updateFormData: Pick<User, "name" | "email">): void {
    if (this.updateForm.valid) {
      this.adminService.collectDataUpdate(updateFormData, userName).pipe(
        first(),
        tap((results: User) => {
          this.showForm = false;
          this.users$ = this.fetchUsers();
        }),
        catchError((error) => {
          console.error('Error updating user:', error);
          return throwError(error);
        })
      ).subscribe(() => {
        this.create.emit(null);
      });

      this.updateForm.reset();
      this.formDirective.resetForm();
    }
  }

  updateUserForm(userName: string) {
    this.selectedUserName = userName;
    this.showForm = true;
    this.users$ = this.fetchUsers();
  }

  banUser(userName: string): void {
    this.adminService.banUser(userName).subscribe(
      () => {
        this.users$ = this.fetchUsers();
        console.log('User banned successfully');
      },
      (error) => {
        console.error('Error banning user:', error);
      }
    );
  }

  unBanUser(userName: string): void {
    this.adminService.unBanUser(userName).subscribe(
      () => {
        this.users$ = this.fetchUsers();
        console.log('User ubanned successfully');
      },
      (error) => {
        console.error('Error unbanning user:', error);
      }
    );
  }

  deleteUser(userName: string): void {
    this.adminService.deleteUser(userName).subscribe(
      () => {
        this.users$ = this.fetchUsers();
        console.log('User deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  fetchUsers(): Observable<User[]> {
    return this.adminService.fetchAllUsers();
  }
}
