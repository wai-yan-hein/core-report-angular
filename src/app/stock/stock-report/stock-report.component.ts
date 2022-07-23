import { Component, OnInit,HostBinding } from '@angular/core';
import { StockReportService } from './stock-report.service';
import { Stock } from 'src/app/core/models/stock.model';
import {animate,state,style,transition,trigger,} from '@angular/animations';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  providers: [StockReportService],
  styleUrls: ['./stock-report.component.css'],
  animations:[
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(60deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})

export class StockReportComponent implements OnInit {
  stocks: Stock[] = [];
  stockGroup: string[] = []
  StockData: any
  displayedColumns: string[] = ['code', 'name', 'location', 'balance'];
  expanded:boolean=false
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(private stockService: StockReportService) { }
  ngOnInit(): void {
    this.getStockBalance();
  }

  //get all Stock Balance
  getStockBalance() {
    this.stockService.searchStock('1').subscribe(stocks => {
      this.stockGroup = [...new Set(stocks.map(data => data.key.stockCode))]
      this.stocks = stocks
      console.log(stocks)
      let map = new Map<string, Stock[]>();
      for (let i = 0; i < this.stockGroup.length; i++) {
        let currStock = this.stocks.filter(item => item.key.stockCode == this.stockGroup[i].toString())
        map.set(this.stockGroup[i].toString(), currStock)
      }
      this.StockData = Array.from(map);
      
      this.ariaExpanded = this.expanded
    })
  }

  //save Pinned Stock
  pinStock(data: any) {
    data[1][0].pin=!data[1][0].pin
    let Stockdata = {
      stockCode: data[0],
      pin: data[1][0].pin
    }
    this.expanded = !this.expanded;
    this.stockService.pinStock(Stockdata).subscribe(stock=>{
      console.log(stock)
     // this.getStockBalance()  
    })
  }




  defaultColDef = {
    editable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    resizable: true,
  };

  columnDefs = [
    { headerName: 'Code', field: 'userCode', cellStyle: { textAlign: 'left' }, width: 100 },
    { headerName: 'Stock Name', field: 'stockName', cellStyle: { textAlign: 'left' }, flex: 1 },
    { headerName: 'Location', field: 'locName', cellStyle: { textAlign: 'left' }, width: 120 },
    { headerName: 'Balance', field: 'balance', type: 'rightAligned', flex: 1 },

  ];
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

}
