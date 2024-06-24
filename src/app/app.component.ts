import { FakePlayer } from './../core/FakePlayer';
import { IMatrixResult, Matrix } from './../core/Matrix';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSlots } from '../core/GameSlots';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  balancePlayer:number = 100;
  lineNumber:number = 1;
  betNumber:number = 0.01;
  valueBet:number = 0.01;

  historial:IMatrixResult[] = [];

  lastSpin:IMatrixResult = {
    id: 0,
    matrix: [],
    evaluation: undefined,
    winner: undefined,
    winnerScatter: undefined,
    linesWinner: undefined,
    mapLines: undefined,
    cardsWinner: undefined,
    factors: undefined,
    lines: undefined,
    bet: undefined,
    cost: undefined
  };

  constructor(){
    GameSlots.SetUp();
  }

  ResetGame(){
    GameSlots.SetUp();
  }


  getBalanceGame():number{
    return GameSlots.Balance;
  }

  incrementbalance(n:number){
    this.balancePlayer += n;
  }

  onOptionSelected(event: any){
    this.valueBet = parseFloat((this.lineNumber * this.betNumber).toFixed(2));
  }

  spinGame(){
    console.log('lineNumber',this.lineNumber);
    console.log('betNumber', this.betNumber);
    let result:IMatrixResult = GameSlots.Spin(this.lineNumber, this.betNumber);
    this.historial.unshift(result);
  }

  getLinesOption():number[]{
    return GameSlots.Lines;
  }

  getBetsOption():number[]{
    return GameSlots.Bets;
  }

  SpinDopamina(){
    let result:IMatrixResult = Matrix.GenerateWinnerExpectation(24);
    console.log(result);
    this.lastSpin = result;
  }

  SpinScatter(n:number){
    let result:IMatrixResult = Matrix.GenerateScatter(n);
    console.log(result);
    this.lastSpin = result;
  }

  SpinPerdedor(){
    let result:IMatrixResult = Matrix.GenerateLoser(true,true);
    console.log(result);
    this.lastSpin = result;
  }
}
