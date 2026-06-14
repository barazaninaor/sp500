import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from '../services/stocks.service';
import { StocksTableComponent } from '../components/stocks-table/stocks-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StocksTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stocks: any[] = [];
  topGainers: any[] = [];
  topLosers: any[] = [];

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    this.stockService.getStocksWithSectors().subscribe(data => {
      this.stocks = data;
      this.calculateMovers();
    });
  }

  calculateMovers() {
    // מיון לפי אחוז שינוי
    const sorted = [...this.stocks].sort((a, b) => 
      (b.market_data?.percent_change || 0) - (a.market_data?.percent_change || 0)
    );
    
    this.topGainers = sorted.slice(0, 5);
    this.topLosers = sorted.slice(-5).reverse();
  }
}