import { fakeAsync } from "@angular/core/testing";
import { FakePlayer } from "./FakePlayer";
import { IMatrixResult, Matrix } from "./Matrix";

export class GameSlots {
  public static InitialBalance: number = 100;
  public static Balance: number;

  public static Lines: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  public static Bets: number[] = [0.01, 0.05, 0.1, 0.25, 0.5, 1.0];

  public static probabilityExpectations = 0.5;

  public static SetUp(){
    GameSlots.Balance = GameSlots.InitialBalance;
  }

  public static counter = 0;

  public static SPIN():IMatrixResult {
    let result:IMatrixResult = {
      id: 0,
      matrix: [],
      evaluation: undefined,
      winner: undefined,
      winnerScatter: undefined,
      linesWinner: undefined,
      mapLines: undefined,
      cardsWinner: undefined,
      factors: undefined,
      lines: FakePlayer.line,
      bet: FakePlayer.bet,
      cost: parseFloat((FakePlayer.line * FakePlayer.bet).toFixed(2)),
      complete: false,
      message: "",
      algorithm: 0
    }
    //ID
    result.id = this.counter;
    this.counter++;

    // el jugador no tiene saldo
    if (result.cost !== undefined && FakePlayer.Balance < result.cost) {
      result.complete = false;
      result.message = "Saldo Insuficiente";
      return result;
    }

    //Cantidad de Balance en Juego!?

    //lanzar probabilidad de Spin con dopamina
    if (Math.random() <= this.probabilityExpectations) {
      let resultMatrix:IMatrixResult = Matrix.GenerateWinnerExpectation(FakePlayer.line);
      result.matrix = resultMatrix.matrix;
      result.evaluation = resultMatrix.evaluation;
      result.winner = resultMatrix.winner;
      result.winnerScatter = resultMatrix.winnerScatter;
      result.linesWinner = resultMatrix.linesWinner;
      result.mapLines = resultMatrix.mapLines;
      result.cardsWinner = resultMatrix.cardsWinner;
      result.algorithm = 1;
      result.message = "Dopamine";
      result.complete = true;
      return result;
    }


    //si ha llegado aca no ha ganado el jugador!!!
    if (result.cost !== undefined) {
      FakePlayer.Balance -= result.cost;
      this.Balance += result.cost;
      FakePlayer.Balance = parseFloat(FakePlayer.Balance.toFixed(2));
      this.Balance = parseFloat(this.Balance.toFixed(2));
    }


    result.complete = true;
    return result;
  }


}
