import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Region } from 'src/app/core/models/region.model';
import { RegionService } from 'src/app/core/services/region/region.service';
import { LayoutService } from 'src/app/layouts/layout.service';
@Component({
  selector: 'app-region-setup',
  templateUrl: './region-setup.component.html',
  styleUrls: ['./region-setup.component.css']
})
export class RegionSetupComponent implements OnInit {
  region!: Region
  regionId: string = ''

  displayedColumns: string[] = ["position", "name"]
  dataSource: MatTableDataSource<Region>
  constructor(private regionService: RegionService, private layoutService: LayoutService) {
    this.region = {} as Region
  }

  //configure region from
  regionForm = new FormGroup({
    regName: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.getRegionData();
  }

  //get all region list
  getRegionData() {
    //this.layoutService.isLoading=true
    this.regionService.getRegion().subscribe({
      next:(region)=>{
      //  this.layoutService.Loading();
        this.dataSource = new MatTableDataSource(region)
      },
      error:(err)=>console.log(err),
      complete:()=>console.log('')
    })
  }

  //get region data from selected row
  getRegionRowData(row: Region) {
    this.initializeFormData(row);
  }

  get f(){
    return this.regionForm.controls;
  }

  //initialize form with data on Edit state
  initializeFormData(region: Region) {
    this.regionId = region.regCode
    this.regionForm.setValue({
      regName: region.regName
    })
  }

  //add or edit Region
  onsaveRegion(data: any) {
    let Region = data
    Region.regCode = this.regionId
    this.regionForm.controls['regName'].setValue('')
    this.regionService.saveRegion(Region).subscribe({
      next: (region) => {
        console.log(region)
        this.regionService._regions.push(region)
        this.getRegionData();
      },
      error: (err) => console.log(err),
      complete: () => this.onClearRegion()
    })
  }

  onClearRegion() {
    this.regionForm.reset();
    this.regionId = ''
  }

}
