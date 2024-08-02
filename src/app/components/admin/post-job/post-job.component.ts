import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tbl_Jobs } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class postJobComponent implements OnInit {

  jobForm: FormGroup;
  constructor(private fb: FormBuilder, private dbService: DbService, @Optional() @Inject(MAT_DIALOG_DATA) public data: tbl_Jobs,
  @Optional() private matDialogRef:MatDialogRef<any>) {
    this.jobForm = this.fb.group({
      brId: 0,
      designation: ['', Validators.required],
      skills: ['', Validators.required],
      experience: ['', Validators.required],
      location: [''],
      status: [''],
      spoc: [''],
      description: [''],
    });

  }

  ngOnInit(): void {
    if (this.data) {
      this.jobForm.patchValue(this.data)
    }
  }
  onSubmit() {
    console.log(this.jobForm.value);
    if (this.jobForm.valid) {

      if (this.data) {
        //Update job details
        this.jobForm.patchValue({
          "spoc": this.dbService.loggedInUserEmail
        })
        const job: tbl_Jobs = this.jobForm.value;
        this.dbService.updateJob(job.brId, job).subscribe(
          () => {
            this.dbService.showSuccess('Job Updates successfully!')
            this.matDialogRef.close(true)
          }, (error) => {
            this.dbService.showError('Job Update Failed!');
            console.log('job update', error);

          }
        )
      }
      else {
        //Add job details
        this.jobForm.patchValue({
          "spoc": this.dbService.loggedInUserEmail
        })
        const job: tbl_Jobs = this.jobForm.value;
        this.dbService.postJob(job).subscribe(
          () => {
            this.dbService.showSuccess('Job posted successfully!!')
          },
          (error) => {
            this.dbService.showError('Job post failed!');
            console.error('job post error', error);

          }
        )
      }


    }
  }


  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }






}

