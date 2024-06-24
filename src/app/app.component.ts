import { Matrix } from './../core/Matrix';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  get():void {
    Matrix.GenerateWinnerExpectation();
  }
}
