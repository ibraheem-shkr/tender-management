import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tender, TenderService } from '../tender.service'; // Import the service

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css']
})
export class TenderDetailsComponent implements OnInit {

  tender: Tender | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tenderService: TenderService // Inject the service
  ) { }

  ngOnInit() {
    // First get the tender id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const tenderIdFromRoute = Number(routeParams.get('tenderId'));

    // Fetch the tender details from the backend
    this.tenderService.getTenderById(tenderIdFromRoute).subscribe(
      (data: Tender) => {
        this.tender = data;
      },
      error => {
        console.error('Error fetching tender details', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['']);
  }
}