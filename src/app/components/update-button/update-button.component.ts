import { Component } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-button',
  standalone: true,                // 2. וודא שזה קיים
  imports: [CommonModule],         // 3. הוסף את זה למערך הייבואים
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css']
})
export class UpdateButtonComponent {
  isLoading = false;
  progress = 0; 
  showToast = false;
  toastMessage = '';
  private progressInterval: any;

  constructor(private stocksService: StocksService) {}

  /**
   * מפעיל את עדכון הנתונים ומנהל את סימולציית ההתקדמות הוויזואלית.
   */
  onUpdate() {
    this.isLoading = true;
    this.progress = 0;

    // התחלת סימולציית התקדמות (עד 95% כדי להשאיר מקום לקפיצה ל-100% בסיום)
    // 5000ms * 95 = 475 שניות (קרוב ל-8 דקות), זה נותן זמן סביר לתהליך של 10 דקות.
    this.progressInterval = setInterval(() => {
      if (this.progress < 95) {
        this.progress += 1;
      }
    }, 5000); 

    this.stocksService.updateMarketData().subscribe({
      next: () => {
        this.completeProgress();
        this.finishUpdate('Data updated successfully!');
      },
      error: (err) => {
        console.error('Update error:', err);
        this.completeProgress();
        this.finishUpdate('Update failed! Please check logs.', true);
      }
    });
  }

  /**
   * עוצר את הטיימר ומציג 100% בסיום התהליך.
   */
  private completeProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.progress = 100;
  }

  /**
   * מציג את הודעת הסיום ומאפס את הכפתור.
   */
  finishUpdate(msg: string, isError = false) {
    this.isLoading = false;
    this.toastMessage = msg;
    this.showToast = true;
    
    // אחרי 3 שניות ההודעה נעלמת והכפתור חוזר למצב רגיל
    setTimeout(() => {
      this.showToast = false;
      this.progress = 0;
    }, 3000);
  }
}