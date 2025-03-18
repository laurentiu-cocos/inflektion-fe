import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnVisibilityService } from '../../services/column-visibility.service';
import { TableComponent } from './components/table/table.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  imports: [CommonModule, TableComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  availableColumns = [
    'ID',
    'Name',
    'Type',
    'Contract',
    'Gross Sales',
    'Commissions',
    'Conversions',
  ];
  isTableDataError: boolean = false;
  isTableDataLoading: boolean = true;
  selectedColumns: string[] = [...this.availableColumns];
  tableData: any[] = [];

  constructor(
    private columnConfigService: ColumnVisibilityService,
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    this.columnConfigService.setVisibleColumns(this.selectedColumns);
  }

  ngOnInit() {
    this.fetchTableData();
  }

  ngAfterViewInit() {
    // Any additional initialization after the view is initialized
  }

  fetchTableData(): void {
    this.httpClient.get(environment.apiUrl).subscribe(
      (data) => {
        this.tableData = Array.isArray(data) ? data : Object.values(data);
        this.isTableDataLoading = false;
      },
      (error) => {
        this.isTableDataError = true;
        this.isTableDataLoading = false;
      }
    );
  }

  clickMessagePartners(): void {
    this.notificationService.showNotification(
      'You clicked on Message Partners ... this is not implemented yet',
      'warning'
    );
  }

  toggleColumn(column: string): void {
    if (this.selectedColumns.includes(column)) {
      this.selectedColumns = this.selectedColumns.filter((c) => c !== column);
    } else {
      this.selectedColumns.push(column);
    }
  }

  updateColumnVisibility(): void {
    this.columnConfigService.setVisibleColumns(this.selectedColumns);
  }

  exportCsv(): void {
    if (this.tableComponent) {
      this.tableComponent.exportCsv();
    }
  }
}
