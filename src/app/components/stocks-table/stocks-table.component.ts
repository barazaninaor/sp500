import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '../../pipes/number-format.pipe';

@Component({
  selector: 'app-stocks-table',
  standalone: true,
  imports: [CommonModule, FormatNumberPipe],
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent {
  @Input() stocks: any[] = [];
  @Input() title: string = '';

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.stocks.sort((a, b) => {
      // פונקציית עזר לחילוץ הערך לפי שם השדה
      const valA = this.getNestedValue(a, column);
      const valB = this.getNestedValue(b, column);

      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      return (valA - valB) * modifier;
    });
  }

  private getNestedValue(obj: any, path: string): number {
    // מפה בין השם ב-HTML למבנה הנתונים ב-JSON
    let value: any;
    switch (path) {
      case '_id': value = obj._id; break;
      case 'last_price': value = obj.market_data?.last_price; break;
      case 'percent_change': value = obj.market_data?.percent_change; break;
      case 'market_cap': value = obj.market_data?.market_cap; break;
      case 'volume': value = obj.market_data?.volume; break;
      case 'founded': value = obj.details?.founded; break;
      default: value = 0;
    }
    return parseFloat(value) || 0;
  }
}