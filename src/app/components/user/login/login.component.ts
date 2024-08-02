import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private dbService: DbService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      empId: [null, Validators.required],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { empId, password } = this.loginForm.value;
      this.dbService.login(empId, password).subscribe(
        response => {
          console.log('res',response);
          if (response.message === 'Login Successful') {
        
            console.log('Login successful', response);
            this.dbService.showSuccess('Login Success!')

            console.log('user', response.data);
            sessionStorage.setItem('user', JSON.stringify(response.data))
            this.router.navigate(['/home']); //  redirect to dashboard
            this.dbService.isUserLoggedIn = true
           // this.dbService.getUserData();

            console.log('logged in user id: ', this.dbService.loggedInUserId);
            console.log('logged in user role: ', this.dbService.loggedInUserRole);

          } else {
            console.error('Login failed', response.message);
            this.dbService.showError(response.message)
          }
        },
        error => {
          console.error('Login failed', error);
          this.dbService.showError('Login failed');

        }
      );
    }
  }
}
