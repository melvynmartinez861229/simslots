import { Spin } from './../../Core/BD';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { listAwards, listBets, listLines } from '../../Core/GameSlots.Helpers';
import { GameSlots, IResult, ISpin } from '../../Core/GameSlots';
import { GameSlotsController } from '../../Core/GameSlotsController';

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
  lines: number[] = listLines;

  /** Coleccion del <Option> */
  bet: number = 0;
  bets: number[] = listBets;

  matrixBuffer:number[][] = [];

  historical:IResult[] = [];

  playerBalance:number = 0;

  lastResult:IResult = {
    spinNumber: 0,
    dataSpin: {
      lines: 0,
      bet: 0,
      rtp: 0,
      volatility: 0
    },
    matrix: [],
    winLines: undefined,
    win: 0,
    rtp: 0,
    gameLog: undefined,
    pricePerLine: 0,
    theMatrix: undefined
  };

  constructor(){
    GameSlots.initialize();
  }

  wave:number[] = []

  public Play(): void {

   console.log(GameSlotsController.spin())


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
    if (result.win > 0) {
      this.playerBalance += result.win;
    }else
    {
      this.playerBalance -= data.bet;
    }
    this.lastResult = result;
  }

  getValuePerLine(number:number,count:number):number{
    return listAwards[number][count]
  }
}
