import { Component, Renderer2, OnInit } from '@angular/core';

import { FlexLayoutModule } from 'ng-flex-layout';

import { environment } from '../environments/development';

import { DisplayComponent } from './components/display-component/display-component';
@Component({
  selector: 'app-root',
  imports: [
    FlexLayoutModule,
    DisplayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  fontUrl = `${environment.staticSiteUrl}/DinaRemasterCollection.ttc`;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const style = this.renderer.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'DinaRemaster';
        src: url('${this.fontUrl}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    this.renderer.appendChild(document.head, style);
  }
}
