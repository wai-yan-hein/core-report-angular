import { Component, OnInit } from '@angular/core';
import { Stock } from './stock';
import { StockReportService } from './stock-report.service';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  providers: [StockReportService],
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {
  stock: Stock[] = [];
  displayedColumns: string[] = ['code', 'name', 'location', 'balance'];
  constructor(private stockService: StockReportService) { }

  ngOnInit(): void {
    this.getStockBalance();
  }
  getStockBalance(): void {
    this.stockService.searchStock('0010010', true)
      .subscribe(stock => {
        this.stock = stock;
        console.log(this.stock);
      })
  }
}
