import { FakePlayer } from './../core/FakePlayer';
import { IMatrixResult, Matrix } from './../core/Matrix';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSlots } from '../core/GameSlots';


export interface IHistorial {
  id: number;
  log: string;
  lines: number;
  bet: number;
  cost: number;
  complete:boolean;
  message:string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  balancePlayer:number = FakePlayer.Balance;
  lineNumber:number = 1;
  betNumber:number = 0.01;
  valueBet:number = 0.01;

  //historial:IMatrixResult[] = [];
  historial:IHistorial[] = [];
  minHistorial:IHistorial[] = [];

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
    cost: undefined,
    complete: false,
    message: '',
    algorithm: 0
  };

  constructor(){
    GameSlots.SetUp();
  }

  ResetGame(){
    GameSlots.SetUp();
    //this.historial = [];
    this.historial = [];
  }


  getBalancePlayer():number{
   return FakePlayer.GetBalance();
  }

  setBalancePlayer(n:number){
    FakePlayer.SetBalance(n);
    this.balancePlayer = FakePlayer.GetBalance();
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
    FakePlayer.line = this.lineNumber;
    FakePlayer.bet = this.betNumber;
    let result:IMatrixResult = GameSlots.SPIN();
    //console.log(result);
    let history:IHistorial = {
      id: this.historial.length + 1,
      message: result.message,
      lines: 0,
      bet: 0,
      cost: 0,
      complete: result.complete,
      log: ''
    }

    if (result.lines !== undefined && result.bet !== undefined && result.cost !== undefined) {
      history.lines = result.lines;
      history.bet = result.bet;
      history.cost = result.cost;
    }

    this.lastSpin = result;
    this.balancePlayer = FakePlayer.GetBalance();
    this.historial.unshift(history);

  }

  getLinesOption():number[]{
    return GameSlots.Lines;
  }

  getBetsOption():number[]{
    return GameSlots.Bets;
  }

  SpinDopamina(){
    let result:IMatrixResult = Matrix.GenerateWinnerExpectation(24);
    //console.log(result);
    this.lastSpin = result;
  }

  SpinScatter(n:number){
    let result:IMatrixResult = Matrix.GenerateScatter(n);
    //console.log(result);
    this.lastSpin = result;
  }

  SpinPerdedor(){
    let result:IMatrixResult = Matrix.GenerateLoser(true,true);
    //console.log(result);
    this.lastSpin = result;
  }
}
