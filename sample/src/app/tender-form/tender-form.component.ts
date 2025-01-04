import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenderService, Tender } from '../tender.service'; // Adjust the path as necessary

@Component({
  selector: 'app-tender-form',
  templateUrl: './tender-form.component.html',
  styleUrls: ['./tender-form.component.css']
})
export class TenderFormComponent {
  tenderForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private tenderService: TenderService) {
    this.tenderForm = this.fb.group({
      tenderReferenceNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      description: ['', Validators.required],
      issueDate: ['', Validators.required],
      closingDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.tenderForm.valid) {
      const tender: Tender = this.tenderForm.value;
      this.tenderService.createTender(tender).subscribe(
        response => {
          console.log('Tender submitted successfully', response);
          this.successMessage = 'Tender submitted successfully!';
          this.tenderForm.reset();
        },
        error => {
          console.error('Error submitting tender', error);
          this.successMessage = 'Failed to submit tender. Please try again.';
        }
      );
    }
  }
}