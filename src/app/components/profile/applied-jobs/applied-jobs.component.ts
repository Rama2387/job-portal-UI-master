import { Component, OnInit } from '@angular/core';
import { tbl_Jobs_Applied } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

  constructor(private dbService: DbService) { }
  myAppliedJobs: tbl_Jobs_Applied[] = []
  ngOnInit(): void {
    const email: string = this.dbService.loggedInUserEmail;
    this.getMyAppliedJobs(email);
  }
  getMyAppliedJobs(email: string) {
    this.dbService.getMyAppliedJobs(email).subscribe(
      (res: tbl_Jobs_Applied[]) => {
        this.myAppliedJobs = res
        console.log('my applied jobs', this.myAppliedJobs);

      },
      (error) => {
        console.log('error', error);

      }
    )
  }

}
