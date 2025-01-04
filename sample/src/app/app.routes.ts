import { TenderDetailsComponent } from "./tender-details/tender-details.component";
import { TenderFormComponent } from "./tender-form/tender-form.component";
import { TenderListComponent } from "./tender-list/tender-list.component";

export const ROUTES = [
    { path: '', component: TenderListComponent },
    { path: 'tenders/:tenderId', component: TenderDetailsComponent },
    { path: 'new', component: TenderFormComponent },
];