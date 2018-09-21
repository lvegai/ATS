import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { IApplicant } from '../../shared/models/applicant.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  routePrefix = 'Applicant'

  constructor(private http:HttpClient) { }

  getAllApplicants() {
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantSelectAll');
  }

  getApplicantById(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantSelectById/' + id)
  }

  offerDetailGetApplicants(jobId, pageNumber, pageSize) {
    console.log('id=' + jobId + ' pnum=' + pageNumber + ' psize=' + pageSize)
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantShowByJobIdHr/' + jobId
    + '/pageNumber=' + pageNumber + '/pageSize=' + pageSize);
  }

  offerDetailTotalApplicants(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantShowByJobIdHrCount/' + id)
  }


  showAllActiveApplicants(){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantShowAllActive')
  }

  showAllInactiveApplicants(){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantShowAllInactive')
  }

  setInactiveApplicant(id){
    return this.http.patch(environment.baseUrl + this.routePrefix + '/ApplicantSetInactive/' + id, id) 
  }

  setActiveApplicant(id){
    return this.http.patch(environment.baseUrl + this.routePrefix + '/ApplicantSetActive/' + id, id) 
  }

  addApplicantMaintenance(applicant) {
    return this.http.post(environment.baseUrl + this.routePrefix + '/ApplicantInsertFromWeb', applicant )
  }




  
  // getApplicantById(id:number){
    
  //   return this.http.get( environment.baseUrl + ''+ id);

  // }
  

  insertApplicant(newApplicant:IApplicant){


    return this.http.post( environment.baseUrl + this.routePrefix + 'ApplicantInsert'
      , newApplicant).subscribe(
           data => {console.log("POST: ", data)},
           error => {console.log("Error", error)}
                      );
  }

  updateApplicant(updatedApplicant:IApplicant){

    return this.http.put( environment.baseUrl + "", updatedApplicant).subscribe(
           data => {console.log("UPDATED: ", data)},
           error => {console.log("Error", error)}
                      );
  }

  // getActiveApplicants(){
  //   return this.http.get(environment.baseUrl + "");
  //  }  

   
  // getInactiveApplicants(){
  //   return this.http.get( environment.baseUrl + "");
  //  }

  // setActiveApplicant(updatedApplicant:IApplicant){

  //   return this.http.put(environment.baseUrl + this.routePrefix + 'ApplicantSetActive', updatedApplicant).subscribe(
  //          data => {console.log("UPDATED: ", data)},
  //          error => {console.log("Error", error)}
  //                     );
  // }






     

  setActiveAddress(id:number){
    return this.http.put( environment.baseUrl + "", id).subscribe(
      data => {console.log("UPDATED: ", data)},
      error => {console.log("Error", error)}
                 );

  }


      
  setIActiveAddress(id:number){
    return this.http.put(environment.baseUrl + "", id).subscribe(
      data => {console.log("UPDATED: ", data)},
      error => {console.log("Error", error)}
                 );
  
  }

  
  universalSearch(keyword, pageNumber, pageSize){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantUniversalSearch/search=' 
     + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
}


 universalSearchCount(keyword, pageNumber, pageSize){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantUniversalSearchCount/search=' 
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
}

universalSearchInactive(keyword, pageNumber, pageSize){
  return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantUniversalSearchInactive/search=' 
   + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
}


universalSearchCountInactive(keyword, pageNumber, pageSize){
  return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantUniversalSearchCountInactive/search=' 
    + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
}

}
