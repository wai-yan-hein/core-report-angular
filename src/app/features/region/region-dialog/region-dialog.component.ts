import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Region } from 'src/app/core/models/region.model';
import { RegionService } from 'src/app/core/services/region/region.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.css']
})
export class RegionDialogComponent implements OnInit {
  message: string
  constructor(private regionService: RegionService,
    private dialogRef: MatDialogRef<RegionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  regionForm = new FormGroup({
    regName: new FormControl('', Validators.required)
  })

  ngOnInit(): void {

  }

  save(data: any) {
    this.regionService.saveRegion(data).subscribe({
      next: (region: any) => {
        if (region.regCode != undefined) {
          this.regionService._region = region
          let dialog = {
            status: true,
            data: region
          }
          this.dialogRef.close(dialog);
        }
        this.message = region.message
      },
      error(err) {
        console.log(err)
      },
      complete() {

      },
    })
  }

}
