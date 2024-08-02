import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tbl_employee_profile, tbl_Jobs } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  userForm: FormGroup;
  userProfile!: tbl_employee_profile;

  constructor(private fb: FormBuilder,  @Optional()  public dialogRef: MatDialogRef<UserProfileComponent>,
    public dbService: DbService, @Optional() @Inject(MAT_DIALOG_DATA) public data: tbl_employee_profile) {
    this.userForm = this.fb.group({
      empId: new FormControl({value: dbService.loggedInUserId, disabled: true}, Validators.required),

      firstName: ['',Validators.required],
      lastName: [''],
      email: ['',Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      designation: [''],
      location: [''],
      experience: ['',Validators.required],
      status: [''],
      skills: this.fb.array([],Validators.required),
      certifications: this.fb.array([]),
      currentProject:['',Validators.required],
      currentBUName:['',Validators.required]
    });

  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }
  onSubmit() {
    console.log(this.userForm.value);

  }


  get skills() {
    return this.userForm.get('skills') as FormArray;
  }
  get certifications() {
    return this.userForm.get('certifications') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  addCertification() {
    this.certifications.push(this.fb.control(''));
  }


  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

  saveProfile() {
    if (this.userForm.valid) {
      const profileData: tbl_employee_profile = {
        ...this.userForm.getRawValue(),
       // empID: this.userForm.get('empId')?.value
      };

      this.dbService.saveUserProfile(profileData).subscribe(
        (res) => {
          if (res.message) {
            this.dbService.showWarn(res.message);
          } else {
            this.dbService.showSuccess('Profile saved successfully');
            this.userProfile = res;
            console.log('user profile',this.userProfile);
            
            this.dialogRef.close(res);
          }
        },
        (error) => {
          console.log('Error while saving user profile', error);
        }
      );
    }
  }
}
