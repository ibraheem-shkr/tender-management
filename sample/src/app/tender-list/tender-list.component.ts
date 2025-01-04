import { Component, OnInit, ViewChild } from '@angular/core';
import { TenderService, Tender } from '../tender.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit {
  displayedColumns: string[] = ['tenderReferenceNumber', 'customerName', 'description', 'issueDate', 'closingDate', 'status', 'details'];
  dataSource = new MatTableDataSource<Tender>();
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  @ViewChild(MatSort) sort!: MatSort; // Use non-null assertion operator

  constructor(private tenderService: TenderService) {}

  ngOnInit() {
    this.fetchTenders();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.searchTerm = term;
      this.dataSource.filter = term.trim().toLowerCase(); // Apply filter
    });
  }

  fetchTenders() {
    this.tenderService.getTenders().subscribe(
      (data: Tender[]) => {
        this.dataSource.data = data; // Set data to the data source
        this.dataSource.sort = this.sort; // Connect MatSort to the data source
      },
      error => {
        console.error('Error fetching tenders', error);
      }
    );
  }

  onSearchKeyup(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }
}