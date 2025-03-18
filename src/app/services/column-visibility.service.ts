import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnVisibilityService {
  private columnVisibilitySource = new BehaviorSubject<string[]>([]); // Initially empty
  columnVisibility$ = this.columnVisibilitySource.asObservable();

  setVisibleColumns(columns: string[]) {
    this.columnVisibilitySource.next(columns);
  }
}
