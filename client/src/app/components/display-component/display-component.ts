import { Component, OnInit, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { FlexLayoutModule } from 'ng-flex-layout';

import { GeoData } from '../../interfaces/GeoData';
import { ApiService } from '../../services/api-service';
import { AnimationService } from '../../services/animation-service';
import { SnackbarComponent } from '../snackbar-component/snackbar-component';
import { handleApiError } from '../../error-handling/APIErrorHandler';
import { zipCodeValidator, getFormControlErrorMessage } from '../../error-handling/UserInputErrorHandler';
import { ModalComponent } from '../modal-component/modal-component';

@Component({
  selector: 'app-display-component',
  imports: [
    NgIf,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  templateUrl: './display-component.html',
  styleUrl: './display-component.css'
})
export class DisplayComponent implements OnInit {
  public geoDataResponse$!: Observable<GeoData> | undefined;
  public zipCodeInput: string = '';
  public readyToSubmit: boolean = false;
  public generalInfoString: string = 'find geography data associated with a zip code';
  public zipCodeInputFormControl = new FormControl('', [Validators.required, zipCodeValidator()]);
  public zipCodeInputFormControlErrorMessage: string | null = null;
  public showFrontOfCard: boolean = true;

  private apiErrorMessageGeneric: string = 'there was an unknown issue getting the zip code you provided';
  private apiErrorMessage404: string = 'the zip code you provided does not exist';
  private apiErrorMessageUnexpected4xx: string = 'A valid request returned a 4xx (non-404) error. The API may have been updated upstream.';
  private userAlertModalMessage: string = 'you can view each city\'s coordinates by clicking the card to flip it over!';
  private defaultGeoIconAnimationScale: number = 2;
  private geoIconElementId: string = 'geo-icon';
  private cardElementId: string = 'card';
  private animationIsComplete: boolean = false;
  private cardRotateYDegreesFront: number = 0;
  private cardRotateYDegreesBack: number = 180;
  private _snackBar = inject(MatSnackBar);
  private _modal = inject(MatDialog);

  private setGeoDataResponse(newValue: Observable<GeoData> | undefined) { this.geoDataResponse$ = newValue; }
  private setZipCodeInput(newValue: string) { this.zipCodeInput = newValue; }
  private setReadyToSubmit(newValue: boolean) { this.readyToSubmit = newValue; }
  private setAnimationIsComplete(newValue: boolean) { this.animationIsComplete = newValue; }
  private setZipCodeInputFormControlErrorMessage(newValue: string | null) { this.zipCodeInputFormControlErrorMessage = newValue; }
  private setShowFrontOfCard(newValue: boolean) { this.showFrontOfCard = newValue; }

  private reset() {
    // wipe template's card when user begins to clear their input
    this.setGeoDataResponse(undefined);
    this.setReadyToSubmit(false);
    this.setZipCodeInput('');
  }

  private openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        errorMessage: `${message}: ${this.zipCodeInput}`
      }
    });
  }

  constructor(private apiService: ApiService, private animationService: AnimationService) { }

  ngOnInit(): void {
    this._modal.open(ModalComponent, { data: {
      alertMessage: this.userAlertModalMessage
    } });
    this.zipCodeInputFormControl.valueChanges.subscribe(value => {
      // gets evaluated on each input field keystroke
      let formControlErrorMessage = getFormControlErrorMessage(this.zipCodeInputFormControl);
      if (!formControlErrorMessage && value !== null) {
        this.setReadyToSubmit(true);
        this.setZipCodeInput(value);
      } else {
        this.setZipCodeInputFormControlErrorMessage(formControlErrorMessage);
        this.reset();
      }
    });

    // this interval is crucial in applying a pulsing effect to the geo icon
    // jsut trying to make the app a little more fun to use :)
    setInterval(() => {
      
      let geoIconElement: HTMLElement | null = document.getElementById(this.geoIconElementId);
      if (geoIconElement !== null) {
        this.setAnimationIsComplete(!this.animationIsComplete);
        let animationPayload: any = {
        scale: this.animationIsComplete ? this.defaultGeoIconAnimationScale : this.animationService.animationScaleCoefficient,
        transition: this.animationService.defaultAnimationDuration
      }
      this.animationService.animateElement(geoIconElement, animationPayload);
      }
    }, this.animationService.redrawIntervalMilliseconds)
  }

  public toggleCardSide() {
    let cardElement: HTMLElement | null = document.getElementById(this.cardElementId);
    this.setShowFrontOfCard(!this.showFrontOfCard);

    if (cardElement !== null) {
      this.animationService.animateElement(cardElement, {
        rotateY: this.showFrontOfCard ? this.cardRotateYDegreesFront : this.cardRotateYDegreesBack,
        easing: 'easeInOutQuad'
      });
    }
  }

  public onSubmit() {
    if (this.readyToSubmit && this.zipCodeInput !== undefined) {
      this.apiService.getZipCodeData(this.zipCodeInput).subscribe({
        next: (geoDataResponse: GeoData) => {
          this.setGeoDataResponse(of(geoDataResponse));
          this._snackBar.dismiss();
        },
        error: (err) => {
          handleApiError(err, this.openSnackBar.bind(this), {
            notFound: this.apiErrorMessage404,
            generic: this.apiErrorMessageGeneric,
            unexpected4xx: this.apiErrorMessageUnexpected4xx
          });
        }
      });
    }
  }
}
