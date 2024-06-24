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


  BalancePlayer:number = 100;

  lineNumber:number = 1;
  betNumber:number = 0.01;
  valueBet:number = 0.01;

  lastSpin:IMatrixResult = {
    matrix: [],
    evaluation: undefined,
    winner: undefined,
    winnerScatter: undefined,
    linesWinner: undefined,
    mapLines: undefined,
    cardsWinner: undefined,
    factors: undefined,
  };


  incrementbalance(n:number){
    this.BalancePlayer += n;
    if (this.BalancePlayer < 0) {
      this.BalancePlayer = 0;
    }
    if (this.BalancePlayer > 500) {
      this.BalancePlayer = 500;
    }
  }

  onOptionSelected(event: any){
    this.valueBet = parseFloat((this.lineNumber * this.betNumber).toFixed(2));
  }

  spinGame(){
    console.log('lineNumber',this.lineNumber);
    console.log('betNumber', this.betNumber);
  }

  get():void {
    //let result:IMatrixResult = Matrix.GenerateLoser(true,true);
    let result:IMatrixResult = Matrix.GenerateWinnerExpectation(5);
    //let result:IMatrixResult = Matrix.GenerateScatter(3);
    console.log(result);
    console.table(result.matrix);
    this.lastSpin = result;
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
