import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlexLayoutModule } from 'ng-flex-layout';

import { DisplayComponent } from './components/display-component/display-component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FlexLayoutModule,
    DisplayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
