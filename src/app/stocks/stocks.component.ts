import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from '../services/stocks.service';
import { StocksTableComponent } from '../components/stocks-table/stocks-table.component';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, StocksTableComponent],
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks: any[] = [];

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    this.stockService.getStocksWithSectors().subscribe(data => {
      this.stocks = data;
    });
  }
}