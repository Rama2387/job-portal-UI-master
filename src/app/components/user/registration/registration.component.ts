import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup ;

  constructor(private fb: FormBuilder,private dbService:DbService,private router:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      empId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const newUser: User = this.registrationForm.value;
      this.dbService.register(newUser).subscribe(
        response => {
          console.log('Registration successful', response);
          this.dbService.showSuccess('Registration success!!')
          this.dbService.getUserData();

          this.router.navigate(['/login'])
        },
        error => {
          this.dbService.showError('Registration failed!')
          console.error('Registration failed', error);
        }
      );
    }
    else{
      this.dbService.showWarn('Enter all the details')
    }
  }
}
