import {
  Component,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
  OnInit,
  OnChanges,
} from '@angular/core';
import { ColumnVisibilityService } from '../../../../services/column-visibility.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  imports: [CommonModule],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() isError: boolean = false;
  @Output() exportCSV: EventEmitter<void> = new EventEmitter<void>(); // Event emitter for export

  currentPage: number = 1;
  displayedRecords: any[] = [];
  perPageRecords: number = 14;
  sortOrder: 'asc' | 'desc' = 'asc';
  sortColumn: string = 'conversions';
  totalPages: number = 0;
  visibleColumns: string[] = [];

  constructor(
    private columnVisibilityService: ColumnVisibilityService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.columnVisibilityService.columnVisibility$.subscribe((columns) => {
      this.visibleColumns = columns;
    });
  }

  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]).join(',') + '\n';
    const csvRows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(',')
    );

    return headers + csvRows.join('\n');
  }

  exportCsv(): void {
    if (this.data.length == 0) {
      this.notificationService.showNotification(
        'Data still loading',
        'warning'
      );
    } else {
      const csvData = this.convertToCSV(this.data);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

      const now = new Date();
      const formattedDate = now
        .toISOString()
        .replace(/T/, '_')
        .replace(/\..+/, '')
        .replace(/:/g, '-');
      const fileName = `data-table_${formattedDate}.csv`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }

  fetchDetails(itemId: number): void {
    this.notificationService.showNotification(
      `Fetching details for item ${itemId}`,
      'info'
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.totalPages = Math.ceil(this.data.length / this.perPageRecords);
      this.updateRecordsShown();
    }
  }

  updateRecordsShown(): void {
    const sortedData = [...this.data].sort((a, b) => {
      const valueA = isNaN(Number(a[this.sortColumn]))
        ? a[this.sortColumn]
        : Number(a[this.sortColumn]);

      const valueB = isNaN(Number(b[this.sortColumn]))
        ? b[this.sortColumn]
        : Number(b[this.sortColumn]);

      // Handle string and number sorting
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });

    const startIndex = (this.currentPage - 1) * this.perPageRecords;
    const endIndex = startIndex + this.perPageRecords;
    this.displayedRecords = sortedData.slice(startIndex, endIndex);
  }

  navigateToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateRecordsShown();
    }
  }

  changeSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
      this.sortColumn = column;
    }
    this.updateRecordsShown();
  }

  getPaginationInfo(): string {
    const start = (this.currentPage - 1) * this.perPageRecords + 1;
    const end = Math.min(
      this.currentPage * this.perPageRecords,
      this.data.length
    );
    return `${start}-${end}`;
  }
}
