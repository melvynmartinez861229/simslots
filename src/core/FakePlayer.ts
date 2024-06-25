export class FakePlayer {

  public static Balance:number = 100;
  public static line:number = 0;
  public static bet:number = 0;

  public static SetBalance(_balance:number){
    this.Balance += _balance;
  }

  public static GetBalance():number{
    return this.Balance;
  }

}
