import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tbl_Jobs_Applied } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss']
})


export class ViewApplicantsComponent implements OnInit {
  cols!: Column[];
  appliedJobs: tbl_Jobs_Applied[] = [];
  brId!: string | null;
  spoc!: string | null;
  constructor(private route: ActivatedRoute, private dbService: DbService) { }

  ngOnInit(): void {
    this.brId = this.route.snapshot.paramMap.get('brId')!;
    this.spoc = this.route.snapshot.paramMap.get('spoc')!;
    this.loadApplicants(this.brId, this.spoc);


    this.cols = [
      { field: 'applicationId', header: 'Application Id' },
      { field: 'brId', header: 'BR Id' },
      { field: 'empEmail', header: 'Employee Email' },
      { field: 'poc', header: 'SPOC' },
      { field: 'appliedDate', header: 'Application Date' },
      { field: 'status', header: 'Status' }
  ];
  }

  loadApplicants(brId: string, spoc: string): void {
    if (brId && spoc) {
      this.dbService.viewApplicants(brId, spoc).subscribe(
        (data: tbl_Jobs_Applied[]) => {
          this.appliedJobs = data;
          console.log('applicants jobs', this.appliedJobs);
        },
        (error) => {
          console.error('Error while fetching applicants jobs', error);
          this.dbService.showError('Error while fetching applicants jobs');
        }
      );
    }
  }

  edit(brId:string, empEmail:string,spoc:string){

  }
}
