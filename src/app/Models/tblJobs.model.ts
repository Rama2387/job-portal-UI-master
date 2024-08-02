export interface tbl_Jobs {
    brId: string,
    designation: string,
    skills: string,
    experience: string,
    status: boolean,
    location: string,
    spoc: string,
  //  empIds: number[],
    description: string,
    panelOpenState?: boolean;
    isApplied?: boolean;

}

export interface role {
    roleId: number
    roleName: string
}

export interface tbl_employee_profile {
    id?: number; // Optional for creation, auto-generated
    empId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    designation: string;
    skills: string[];
    location: string;
    experience: string;
    certifications: string[];
    currentProject: string;
    currentBUName: string;
    status:string
    //resume
  }
  

  

export interface tbl_Jobs_Applied{
    applicationId:string,
    brId:string,
    empEmail:string,
    status:string,
    poc:string
    appliedDate:Date

}