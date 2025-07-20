import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div class="app-container">
      <h1>🎮 6 in a Row</h1>
      <app-game></app-game>
    </div>
  `,
    styles: [`
    .app-container {
      text-align: center;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
    title = 'six-in-row';
}