import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tbl_Jobs, tbl_Jobs_Applied } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';
import { postJobComponent } from '../post-job/post-job.component';
interface ExtendedJob extends tbl_Jobs {
  panelOpenState: boolean;
}
@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {
  panelOpenState = false;
  allJobs: ExtendedJob[] = []
  url: string = ''
  // myAppliedJobs: tbl_Jobs_Applied[] = []
  myPostedJobs: tbl_Jobs[] = [];

  appliedJobs: tbl_Jobs_Applied[] = [];
  constructor(public dbService: DbService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.url = this.router.url;

    if (this.dbService.loggedInUserRole === 1) {
      this.loadAllJobs();
      console.log('url', this.url);
      if (this.url === '/my-jobs') {
        this.loadMyJobs(this.dbService.loggedInUserEmail)
      }
    }
    if (this.dbService.loggedInUserRole === 2) {
      // this.loadMyAppliedJobs();
      this.loadAllJobs();
    }
  }
  loadMyJobs(email: string) {
    debugger
    this.dbService.getMyPostedJobs(email).subscribe(
      (data: tbl_Jobs[]) => {
        this.myPostedJobs = data;
      },
      (error) => {
        this.dbService.showError('Error while fetching jobs data');
        console.error('Error fetching my posted jobs', error);
      }
    )
  }

  loadAllJobs(): void {
    this.dbService.getAllJobs().subscribe(
      (data: tbl_Jobs[]) => {
        // Initialize panelOpenState for each job
        this.allJobs = data.map(job => ({ ...job, panelOpenState: false, isApplied: false }));
        console.log('all jobs with panel state', this.allJobs);


      },
      (error) => {
        this.dbService.showError('Error while fetching jobs data');
        console.error('Error fetching all jobs', error);
      }
    );
  }

  togglePanel(job: ExtendedJob): void {
    job.panelOpenState = !job.panelOpenState;
  }

  applyJob(job: tbl_Jobs) {
    console.log('apply job', job);
    let applyJob: tbl_Jobs_Applied = {
      applicationId: 'AP1001_' + this.dbService.loggedInUserId, //auto generate in sql
      brId: job.brId,
      empEmail: this.dbService.loggedInUserEmail,
      status: 'Applied',
      poc: job.spoc,
      appliedDate: new Date()
    }
    this.dbService.applyJob(applyJob).subscribe(
      (res) => {
        console.log(res.value);
        // Update the job to reflect that it has been applied
        job.isApplied = true;
        this.dbService.showSuccess('Applied Successfully')
      },
      (error) => {
        console.log('error while applying', error);
        this.dbService.showError('Error while applying job')

      }
    )

  }



  viewApplicants(brId: string, spoc: string) {
    this.router.navigate(['/view-applicants', brId, spoc]);
  }
  openEditJobForm(job: tbl_Jobs) {
    this.dialog.open(postJobComponent, { data: job })
  }
}
