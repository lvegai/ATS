import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { IJob } from '../../../shared/models/job.model';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { IJobCategory } from '../../../shared/models/job_category.model';
import { JobCategoryService } from '../../../shared/services/job-category.service';
import { IJobType } from '../../../shared/models/job_type.model';
import { JobTypeService } from '../../../shared/services/job-type.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../../shared/services/company.service';
import { ICompany } from '../../../shared/models/company.model';
import { IJobInsert } from '../../../shared/models/job_insert.model';
import { AddressService } from '../../../shared/services/address.service';
import { IAddress } from '../../../shared/models/address.model';



@Component({
  selector: 'app-offer-maintenance',
  templateUrl: './offer-maintenance.component.html',
  //styleUrls: ['./offer-maintenance.component.css']
})
export class OfferMaintenanceComponent implements OnInit {


  currentCompany:ICompany
  currentAddress:IAddress
  selectedJobType: string ='Default'
  selectedJobCategory: string = 'Default'
  createdJob:IJobInsert

  availableJobs:IJobOffer[]
  inactiveJobs:IJobOffer[]
  draftJobs:IJobOffer[]
  job:IJob

  categories:IJobCategory[]
 
  types:IJobType[]

  closeResult:string;
  
  newJobForm: FormGroup
  jobName: FormControl
  jobCompany: FormControl
  jobCity: FormControl
  jobCountry: FormControl
  jobCategory: FormControl
  jobType: FormControl
  jobDescription: FormControl

  jobEditForm: FormGroup
  name: FormControl
  company: FormControl
  city: FormControl
  country: FormControl
  category: FormControl
  type: FormControl
  description: FormControl



  constructor( private router: Router,
    private jobService: JobService, 
    private jobCategoryService: JobCategoryService,
    private jobTypeService: JobTypeService,
    private companyService: CompanyService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.companyService.getCompanyById(1)
    .subscribe((data:ICompany) => {
      this.currentCompany = data['Data'];

      this.addressService.getAddressById(this.currentCompany.addressId)
      .subscribe((data:IAddress) => {
        this.currentAddress = data['Data'];
        console.log(this.currentAddress)
      })

    })



    this.jobService.showAvalaibleJobs()
    .subscribe((data:IJobOffer[]) => {
      this.availableJobs = data['Data'];
     })
     
    this.jobService.showPastJobs()
      .subscribe((data:IJobOffer[])=> {
        this.inactiveJobs = data['Data']
      })

      this.jobService.showDraftJobs()
      .subscribe((data:IJobOffer[])=> {
        this.draftJobs = data['Data']
      })

    this.jobCategoryService.showCategories()
       .subscribe((data:IJobCategory[]) => {
         this.categories = data['Data'];
       })


    this.jobTypeService.showTypes()
       .subscribe((data:IJobType[]) => {
         this.types = data['Data']
       })


    // These are the controls for the edit job form.
    this.name = new FormControl(),
    this.company = new FormControl({value:this.currentCompany.name, disabled:true}, Validators.required),
    this.city = new FormControl(),
    this.country = new FormControl(),
    this.category = new FormControl(),
    this.type = new FormControl(),
    this.description = new FormControl()


    // These are the controls for the add job form.
    this.jobName = new FormControl()
    this.jobCompany = new FormControl()
    this.jobCity = new FormControl()
    this.jobCountry = new FormControl()
    this.jobCategory = new FormControl()
    this.jobType = new FormControl ()
    this.jobDescription = new FormControl()

    this.newJobForm = new FormGroup({
      jobName: this.jobName,
      jobCompany: this.jobCompany,
      jobCity: this.jobCity,
      jobCountry: this.jobCountry,
      jobCategory: this.jobCategory,
      jobType: this.jobType,
      jobDescription: this.jobDescription,
    })
    
    this.jobEditForm = new FormGroup({
      name: this.name,
      company: this.company,
      city: this.city,
      country: this.country,
      category: this.category,
      type: this.type,
      description: this.description
    })

  }

  openEdit(content, job) {

    this.jobEditForm.get('name').setValue(job.jobName)
    this.jobEditForm.get('company').setValue(job.company)
    this.jobEditForm.get('city').setValue(job.city)
    // this.jobEditForm.get('country').setValue(job.country)
    // this.jobEditForm.get('category').setValue(job.jobCategory)
    // this.jobEditForm.get('type').setValue(job.jobType)
    this.jobEditForm.get('description').setValue(job.description)

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  createJob(newJobForm){
 
    this.createdJob = {
      jobName: newJobForm.jobName, 
      companyId: this.currentCompany.id, 
      jobCategory: newJobForm.jobCategory, 
      jobType:newJobForm.jobType, 
      jobDescription: newJobForm.jobDescription

    }
    //console.log(this.createdJob)
    this.jobService.addJobMaintenance(this.createdJob)
    .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })

    // console.log(newJobForm.jobName)
    // console.log(this.currentCompany.id)
    // console.log(newJobForm.jobCategory)
    // console.log(newJobForm.jobType)
    // console.log(newJobForm.jobDescription)

    // this.jobService.addJobMaintenance(job) {

    // }

    // console.log(jobForm)
  
    //   let jcId
   
    //   this.categories.forEach(element => {
  
    //     if (jobForm.category = element.name)
    //         jcId = element.id
        
    //   });
  
         
      // this.job = {
      //   name: jobForm.name,
      //   companyId: 0,
      //   jobCategoryId: jcId,
      //    description: jobForm.description
      // }
  
  
      // this.types.forEach(element => {
  
      //   if (jobForm.type = element.name)
      //       this.job.jobTypeId = element.id
        
      // });

      // console.log(this.job)
    }
  

  setJobActive(id){

    this.jobService.setActiveJob(id)
    .subscribe(
      data => {console.log("UPDATED: ", data)},
      error => {console.log("Error", error)}
                 );
  }

  setJobInactive(id){

    this.jobService.setInActiveJob(id)
    .subscribe(
      data => {console.log("UPDATED: ", data)},
      error => {console.log("Error", error)}
                 );
  }


    //event handler for the select element's change event
    selectJobTypeChangeHandler (event: any) {
      //update the ui
      this.selectedJobType = event.target.value;
    }

    selectJobCatChangeHandler (event: any) {
      //update the ui
      this.selectedJobCategory = event.target.value;
    }


}
