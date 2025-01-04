export interface Tender {
  id: number;
  tenderReferenceNumber: string;
  customerName: string;
  description: string;
  issueDate: string;
  closingDate: string;
  status: string; // New field for tender status
}
