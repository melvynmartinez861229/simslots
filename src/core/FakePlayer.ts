export class FakePlayer {

  public static Balance:number = 100;

  public static SetBalance(_balance:number){
    this.Balance += _balance;
  }

}
