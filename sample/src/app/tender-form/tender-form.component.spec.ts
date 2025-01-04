import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TenderFormComponent } from './tender-form.component';

describe('TenderFormComponent', () => {
  let component: TenderFormComponent;
  let fixture: ComponentFixture<TenderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenderFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with required fields', () => {
    expect(component.tenderForm.contains('tenderReferenceNumber')).toBeTruthy();
    expect(component.tenderForm.contains('customerName')).toBeTruthy();
    expect(component.tenderForm.contains('description')).toBeTruthy();
    expect(component.tenderForm.contains('issueDate')).toBeTruthy();
    expect(component.tenderForm.contains('closingDate')).toBeTruthy();
  });

  it('should make the tenderReferenceNumber field required', () => {
    let control = component.tenderForm.get('tenderReferenceNumber');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should display success message on valid form submission', () => {
    component.tenderForm.setValue({
      tenderReferenceNumber: 'TR123',
      customerName: 'John Doe',
      description: 'Tender Description',
      issueDate: '2023-10-01',
      closingDate: '2023-10-10'
    });
    component.onSubmit();
    expect(component.successMessage).toBe('Tender submitted successfully!');
  });

  it('should reset the form after successful submission', () => {
    component.tenderForm.setValue({
      tenderReferenceNumber: 'TR123',
      customerName: 'John Doe',
      description: 'Tender Description',
      issueDate: '2023-10-01',
      closingDate: '2023-10-10'
    });
    component.onSubmit();
    expect(component.tenderForm.valid).toBeFalsy();
  });
});