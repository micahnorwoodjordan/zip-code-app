import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from 'ng-flex-layout';

@Component({
  selector: 'app-display-component',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule
  ],
  templateUrl: './display-component.html',
  styleUrl: './display-component.css'
})
export class DisplayComponent {
  public city: string = 'Phoenix';
  public state: string = 'Arizona';
}
