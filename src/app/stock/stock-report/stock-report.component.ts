import { Component, OnInit } from '@angular/core';
import { StockReportService } from './stock-report.service';
import { Stock } from 'src/app/core/models/stock.model';
@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  providers: [StockReportService],
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {
  stocks: Stock[] = [];
  displayedColumns: string[] = ['code', 'name', 'location', 'balance'];
  constructor(private stockService: StockReportService) { }

  ngOnInit(): void {
    this.getStockBalance();
  }
  getStockBalance(): void {
    this.stockService.searchStock('1').subscribe(stocks => {
      this.stocks = stocks
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
