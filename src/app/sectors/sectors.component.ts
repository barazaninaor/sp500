import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksService } from '../services/stocks.service';
import { StocksTableComponent } from '../components/stocks-table/stocks-table.component'; // ייבוא הקומפוננטה החדשה

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, StocksTableComponent],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  sectors: any[] = [];
  allStocks: any[] = [];
  filteredStocks: any[] = [];
  selectedSectorName: string = '';
  activeSectorId: string = '';

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    this.stockService.getSectors().subscribe(data => {
      this.sectors = data;
    });

    this.stockService.getStocksWithSectors().subscribe(data => {
      this.allStocks = data;
    });
  }

  onSelectSector(sector: any) {
    this.selectedSectorName = sector.name;
    this.activeSectorId = sector._id;

    let filtered = this.allStocks.filter(stock => {
      return stock.sector_details && 
             stock.sector_details.some((s: any) => s._id === sector._id);
    });

    this.filteredStocks = filtered.sort((a, b) => {
      return (b.market_data?.market_cap || 0) - (a.market_data?.market_cap || 0);
    });
  }
}