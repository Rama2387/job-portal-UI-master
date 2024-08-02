import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { CreateUserComponent } from './components/profile/create-user/create-user.component';
import { HomeComponent } from './components/layout/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { postJobComponent } from './components/admin/post-job/post-job.component';
import { AllJobsComponent } from './components/admin/all-jobs/all-jobs.component';
import { AppliedJobsComponent } from './components/profile/applied-jobs/applied-jobs.component';
import { ViewApplicantsComponent } from './components/admin/view-applicants/view-applicants.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'profile/:empId', component: UserProfileComponent },
  { path: 'create-user', component: CreateUserComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  { path: 'post-job', component: postJobComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent },
  { path: 'find-jobs', component: AllJobsComponent },
  { path: 'my-jobs', component: AllJobsComponent },
  { path: 'all-jobs', component: AllJobsComponent },
  { path: 'view-applicants/:brId/:spoc', component: ViewApplicantsComponent },
  { path: '**',redirectTo:'/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
