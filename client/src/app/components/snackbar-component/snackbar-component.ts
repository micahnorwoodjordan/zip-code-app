import { Component, Inject, inject } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-component',
  imports: [
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel
  ],
  templateUrl: './snackbar-component.html',
  styleUrl: './snackbar-component.css'
})
export class SnackbarComponent {
  // shuttle data from caller all the way to snackbar template
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { errorMessage: string }) { }

  private _snackbarRef = inject<MatSnackBarRef<MatSnackBar>>(MatSnackBarRef);

  public dismissSnackbar(event: MouseEvent): void {
    this._snackbarRef.dismiss();
    event.preventDefault();
  }
}
