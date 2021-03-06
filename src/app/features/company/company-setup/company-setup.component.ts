import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegionDialogComponent } from '../../region/region-dialog/region-dialog.component';
import { Company } from 'src/app/core/models/company.model';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { Region } from 'src/app/core/models/region.model';
import { RegionService } from 'src/app/core/services/region/region.service';
import * as moment from 'moment'
@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.css']
})
export class CompanySetupComponent implements OnInit {
  company: Company
  compId: string
  status:string
  regions: Region[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm',{static:true}) reactiveForm:NgForm
  constructor(private route: Router, private comService: CompanyService, private regionService: RegionService, public dialog: MatDialog) {
    this.company = {} as Company
  }

  companyForm = new FormGroup({
    compName: new FormControl('',Validators.required),
    phone: new FormControl(''),
    email: new FormControl('',),
    address: new FormControl(''),
    startDate: new FormControl(this.todayDate,Validators.required),
    region: new FormControl(null,Validators.required),
    active: new FormControl(true)
  })

  ngOnInit(): void {
    this.getRegion()
    this.status='Add'
    if(this.comService._company!=undefined){
      this.company=this.comService._company
      this.compId=this.company.compCode
      this.status='Edit'
      this.initializeCompanyForm(this.company)
      this.company.email='htut.com testing'
    }
  }

  //initialize Form data on Edit
  initializeCompanyForm(company:Company){
    this.companyForm.setValue({
      compName: company.compName,
      phone: company.phone,
      email: company.email,
      address: company.address,
      startDate: company.startDate,
      region: company.region,
      active: company.active
    })
  }

  //get all region
  getRegion() {
    this.regionService.getRegion().subscribe({
      next: (regions) => {
        this.regions = regions
      },
      error: err => console.log(err),
      complete: () => {

      }
    })
  }

  //add region
  addRegion() {
    this.dialog.open(RegionDialogComponent, {
      disableClose: true
    })
      .afterClosed()
      .subscribe(dialog => {
        if (dialog.status) {
          this.regions.push(dialog.data)
          this.companyForm.controls['region'].setValue(dialog.data);
        }
      })
    // this.dialog.open(RegionDialogComponent)
    //   .afterClosed().subscribe(
    //     res => {
    //       console.log('from parent', JSON.stringify(res))
    //       let Region = res
    //       this.regionService.saveRegion(Region).subscribe({
    //         next: (region) => {
    //           	if(region.regCode!=undefined){
    //               this.regionService._regions.push(region)

    //             }
    //         },
    //         error: (err) => console.log(err),
    //         complete: () => {

    //         }
    //       })
    //     }
    //   )
  }

  //add or edit region
  save(data: any) {
    let startDate = moment(data.openingDate)
    let startDateValue = startDate.format('yyyy-MM-DD ')
    let Company = data
    Company.compCode = this.compId
    Company.startDate = startDateValue
    Company.status=this.status
    console.log(Company)
    this.comService.saveCompany(Company).subscribe({
      next: (company) => {
        if(this.compId==''){
          this.comService._companys.push(company)
        }
      
      },
      error: err => console.log(err),
      complete: () => {
        this.compId=''
        this.onClear()
        this.comService._company=undefined
      }
    })
  }

  //back to list
  backToList(){
    this.compId=''
    this.clearCompany(this.compId)
    this.comService._company=undefined
    this.route.navigate(['/company'])
  }

  //clear data
  onClear(){
    this.clearCompany(this.compId)
    this.reactiveForm.resetForm();
  }

  //clear Company
  clearCompany(id:string){
    this.companyForm.reset()
    this.company={} as Company
    this.compId=id
   this.comService._company=undefined
  }

  //compare employee data with initial data
  compareRegion(r1: Region, r2: Region) {
    return r1 && r2 ? r1.regCode === r2.regCode : r1 === r2
  }

}
