import { FakePlayer } from "./FakePlayer";
import { IMatrixResult } from "./Matrix";

export class GameSlots {
  public static InitialBalance: number = 100;
  public static Balance: number;

  public static Lines: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  public static Bets: number[] = [0.01, 0.05, 0.1, 0.25, 0.5, 1.0];


  public static SetUp(){
    GameSlots.Balance = GameSlots.InitialBalance;
  }

  public static counter = 0;

  public static Spin(lineSelect:number, betSelect:number):IMatrixResult {
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
      lines: lineSelect,
      bet: betSelect,
      cost: parseFloat((lineSelect * betSelect).toFixed(2)),
      complete: false,
      message: ""
    }


    if (result.cost !== undefined && FakePlayer.Balance < result.cost) {
      result.complete = false;
      result.message = "Saldo Insuficiente";
      return result;
    }


    result.id = this.counter;
    this.counter++;

    result.complete = true;
    return result;
  }


}
