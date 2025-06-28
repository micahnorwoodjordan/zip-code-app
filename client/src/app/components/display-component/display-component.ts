import { Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  FormControl, Validators, FormsModule, ReactiveFormsModule,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';

import { Observable, of } from 'rxjs';

import { FlexLayoutModule } from 'ng-flex-layout';

import { GeoData } from '../../interfaces/GeoData';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-display-component',
  imports: [
    NgIf,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  templateUrl: './display-component.html',
  styleUrl: './display-component.css'
})
export class DisplayComponent implements OnInit {
  public city: string = 'Phoenix';
  public state: string = 'Arizona';
  public geoData$!: Observable<GeoData>;
  public readyToSubmit: boolean = false;

  public zipCodeInputFormControl = new FormControl('', [Validators.required, this.validateZipCodeInput()]);

  private setReadyToSubmit(newValue: boolean) { this.readyToSubmit = newValue; }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.zipCodeInputFormControl.valueChanges.subscribe(value => {
      // gets evaluated each time a user types into the form input field
      if (!this.zipCodeErrorMessage && value !== null) {
        this.setReadyToSubmit(true);
      } else {
        this.setReadyToSubmit(false);
      }
    });
    // this.apiService.getZipCodeData
  }

  private validateZipCodeInput(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^\d{5}(-\d{4})?$/.test(control.value);
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
}
