import { Component, OnInit, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  FormControl, Validators, FormsModule, ReactiveFormsModule,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';

import { Observable, of } from 'rxjs';

import { FlexLayoutModule } from 'ng-flex-layout';

import { GeoData } from '../../interfaces/GeoData';

import { ApiService } from '../../services/api-service';
import { AnimationService } from '../../services/animation-service';

import { SnackbarComponent } from '../snackbar-component/snackbar-component';

import { HttpStatusCode } from '../../enums/HttpStatusCodes';

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
  public defaultInfoString: string = 'find geography data associated with a zip code';
  public zipCodeInputFormControl = new FormControl('', [Validators.required, this.validateZipCodeInput()]);

  private apiErrorMessageGeneric: string = 'there was an unknown issue getting the zip code you provided';
  private apiErrorMessage404: string = 'the zip code you provided does not exist';
  private defaultGeoIconAnimationScale: number = 2;
  private geoIconElementId: string = 'geo-icon';
  private animationIsComplete: boolean = false;

  private setGeoDataResponse(newValue: Observable<GeoData> | undefined) { this.geoDataResponse$ = newValue; }
  private setZipCodeInput(newValue: string) { this.zipCodeInput = newValue; }
  private setReadyToSubmit(newValue: boolean) { this.readyToSubmit = newValue; }
  private setAnimationIsComplete(newValue: boolean) { this.animationIsComplete = newValue; }

  private reset() {
    // wipe template's card when user begins to clear their input
    this.setGeoDataResponse(undefined);
    this.setReadyToSubmit(false);
    this.setZipCodeInput('');
  }

  private _snackBar = inject(MatSnackBar);

  private openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        errorMessage: `${message}: ${this.zipCodeInput}`
      }
    });
  }

  constructor(private apiService: ApiService, private animationService: AnimationService) { }

  ngOnInit(): void {
    this.zipCodeInputFormControl.valueChanges.subscribe(value => {
      // gets evaluated each time a user types into the form input field
      if (!this.zipCodeErrorMessage && value !== null) {
        this.setReadyToSubmit(true);
        this.setZipCodeInput(value);
      } else {
        this.reset();
      }
    });

    // this interval is crucial in applying a pulsing effect to the geo icon
    // jsut trying to make the app a little more fun to use :)
    setInterval(() => {
      this.setAnimationIsComplete(!this.animationIsComplete);
      let geoIconElement: HTMLElement | null = document.getElementById(this.geoIconElementId);
      let animationPayload: any = {
        scale: this.animationIsComplete ? this.defaultGeoIconAnimationScale : this.animationService.animationScaleCoefficient,
        transition: this.animationService.defaultAnimationDuration
      }
      this.animationService.animateElement(geoIconElement, animationPayload);
    }, this.animationService.redrawIntervalMilliseconds)
  }

  private validateZipCodeInput(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^\d{5}(-\d{4})?$/.test(control.value);  // simple regex to validate U.S. zip codes
      return isValid ? null : { invalidZipCode: true };
    };
  }

  public get zipCodeErrorMessage(): string | null {
    const control = this.zipCodeInputFormControl;
    if (control.hasError('required')) {
      return 'Zip code is required';
    }
    if (control.hasError('invalidZipCode')) {
      return 'Please enter a valid United States zip code.';
    }
    return null;
  }

  public onSubmit() {
    if (this.readyToSubmit && this.zipCodeInput !== undefined) {
      this.apiService.getZipCodeData(this.zipCodeInput).subscribe({
        next: (geoDataResponse: GeoData) => {
          this.setGeoDataResponse(of(geoDataResponse));
        },
        error: (err) => {
          // TODO: add more granular handling
          if (err.status == HttpStatusCode.NOT_FOUND) {
            this.openSnackBar(this.apiErrorMessage404);
          } else if (err.status == HttpStatusCode.INTERNAL_SERVER_ERROR) {
            this.openSnackBar(this.apiErrorMessageGeneric);
          }
          console.error('Error getting zip code data:', err);
        }
      });
    }
  }
}
