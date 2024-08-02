import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { tbl_employee_profile } from 'src/app/Models/tblJobs.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  empId!: number
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFileName!: string;

  userProfile: tbl_employee_profile = {
    empId: this.empId,
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    skills: [],
    experience: "0",
    designation: '',
    certifications: [],
    currentProject: '',
    currentBUName: '',
    location: '',
    status:''
  }
 


  constructor( private dbService: DbService, private _dialog: MatDialog, private activatedRoute: ActivatedRoute) {
   

  }
  ngOnInit(): void {
    this.empId = Number(this.activatedRoute.snapshot.paramMap.get('empId')!);
    console.log('emp id', this.empId);

    this.getProfile(this.empId);
  }

  downloadResume() {
    // Logic to download resume
  }
  getProfile(empId: number) {
    debugger
    if (empId) {
      this.dbService.getUserProfile(empId).subscribe(
        (res) => {
          if (res.message && res.message === 'Profile not found') {
            this.userProfile.empId = empId;
            this.dbService.showWarn('Please complete your profile');
          } else {
            this.userProfile = res;
            console.log('user profile', this.userProfile);

          }
        },
        (error) => {
          console.log('Error while fetching user profile', error);
        }
      );
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;  // Store the file name
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // this.http.post('http://localhost:3000/upload', formData).subscribe(
    //   (response) => {
    //     console.log('Upload successful', response);
    //   },
    //   (error) => {
    //     console.error('Upload failed', error);
    //   }
    // );
  }

 

  editProfile(userProfile: tbl_employee_profile) {
    console.log('Edit icon clicked!!.');
    const dialogRef = this._dialog.open(CreateUserComponent, { data: userProfile })
    dialogRef.afterClosed().subscribe((profile: tbl_employee_profile) => {
      console.log('The dialog was closed');
      console.log('Dialog result:', profile);
      // Use the result data
      if (profile) {
        this.getProfile(profile.empId);
      }
    });
  }



}
