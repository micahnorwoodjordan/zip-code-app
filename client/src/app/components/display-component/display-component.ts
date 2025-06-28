import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from 'ng-flex-layout';

@Component({
  selector: 'app-display-component',
  imports: [
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule
  ],
  templateUrl: './display-component.html',
  styleUrl: './display-component.css'
})
export class DisplayComponent {
  public city: string = 'Phoenix';
  public state: string = 'Arizona';
}
