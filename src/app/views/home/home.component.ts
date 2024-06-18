import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Statistics } from '../../Core/Statistics';
import { Matrix, LineResult, winResult } from '../../Core/Matrix';
import { bets, lines } from '../../Core/GameSlots.Helpers';
import { GameSlots, IResult, ISpin } from '../../Core/GameSlots';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styles: '',
})
export class HomeComponent {
  volatility: number = 95;
  rtp: number = 97;

  /** Coleccion del <Option> */
  line: number = 0;
  lines: number[] = lines;

  /** Coleccion del <Option> */
  bet: number = 0;
  bets: number[] = bets;

  matrixBuffer:number[][] = [];

  historical:IResult[] = [];

  constructor(){
    GameSlots.initialize();
  }

  public Play(): void {
    let data: ISpin = {
      lines: this.lines[this.line],
      bet: this.bets[this.bet],
      rtp: this.rtp / 100,
      volatility: this.volatility / 100,
    };
    let result: IResult = GameSlots.play(data);
    console.log(result);
    this.matrixBuffer = result.matrix;
    this.historical.push(result);
  }
}
