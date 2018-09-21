import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { IHRApplicant } from '../../../shared/models/IHRApplicant.model'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HrApplicantProfileService } from '../../../shared/services/hr-applicant-profile.service';
import { IHRAction } from '../../../shared/models/IHRAction.model';
import { ApplicationActionService } from '../../../shared/services/application-action.service';
import { IApplicationActionShow } from '../../../shared/models/application-action-show.model';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-hr-applicant-profile',
  templateUrl: './hr-applicant-profile.component.html',
  //styleUrls: ['./hr-applicant-profile.component.css']
})
export class HrApplicantProfileComponent implements OnInit {

  applicant:IHRApplicant
  action: IHRAction
  actions:IApplicationActionShow[]


  page: number = this.pagination.pageNumber;
  paginatorSize: number
  totalJobs: number
  paginatorCollectionSize: number
  pageSize: number
  
  closeResult: string;

  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private router : Router, private applicantService: HrApplicantProfileService,  
    private modalService: NgbModal, private applicationActionService: ApplicationActionService
  ,private pagination:PaginationService) { }

  ngOnInit() {

    this.loadActions()
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  
  openNewAction(content, job) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {


      (this.closeResult = `Closed with: ${result}`)
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
      return `with: ${reason}`;
    }
  }

  // loadApplicantInfo(){
  //   this.applicantService.getHRApplicantInfo(6)
  //   .subscribe((data:IHRApplicant) => {
  //     this.applicant = data['Data'];
  //     this.applicantService.currentApplicant = this.applicant
  //   })
  // }

  loadActions(){
    this.applicationActionService.getAllApplicationActions(1, 1, 5)
    .subscribe((data:IApplicationActionShow[]) => {
      this.actions = data['Data']
    })

  }
}
