import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
  standalone: true
})
export class FormatNumberPipe implements PipeTransform {
  /**
   * ממיר מספרים גדולים לפורמט קריא (K, M, B, T)
   * לדוגמה: 23400 -> 23.40K
   */
  transform(value: number | string): string {
    // המרה למספר במידה והגיע כטקסט
    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (num === null || num === undefined || isNaN(num)) {
      return '0';
    }

    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9)  return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6)  return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3)  return (num / 1e3).toFixed(2) + 'K';
    
    return num.toLocaleString(); // מחזיר מספר רגיל עם פסיקים לאלפים אם קטן מ-1000
  }
}