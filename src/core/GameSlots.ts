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

  public static Spin(lineSelect:number, betSelect:number) {

  }
}