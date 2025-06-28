import { Component, Inject } from '@angular/core';

import { FlexLayoutModule } from 'ng-flex-layout';

import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-modal-component',
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.css'
})
export class ModalComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { alertMessage: string }) { }
}
