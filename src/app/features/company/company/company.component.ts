import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/core/models/company.model';
import { CompanyService } from 'src/app/core/services/company/company.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companys:Company[]=[]
  displayedColumns:string[]=["position","compCode","compName","phone","email","address","region","startDate","action"]
  dataSource:MatTableDataSource<Company>
  constructor(private route:Router,private compService:CompanyService) { }

  ngOnInit(): void {
    this.getCompany()
  }

  //get all copanys
  getCompany(){
    this.compService.getCompany().subscribe({
      next:company=>{
        console.log(company)
        this.dataSource=new MatTableDataSource(company)
      },
      error(err) {
          console.log('company list ')
          console.log(err)
      },
      complete() {
          
      },
    })
  }

  getRowData(row:any){
    this.route.navigate(['/company-setup'])
    this.compService._company=row
  }

}
