import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatIconModule} from '@angular/material/icon';
import { CreateUserComponent } from './create-user/create-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [UserProfileComponent, CreateUserComponent, AppliedJobsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatTooltipModule
  
  ],
  exports:[UserProfileComponent,CreateUserComponent,AppliedJobsComponent]
})
export class ProfileModule { }
