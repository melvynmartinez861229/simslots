/** FAKE PLAYER */
export class Player {

  public id!:number;
  public balance!:number;
  public lines = 0;
  public bet = 0;
  public freeSpin:boolean = false;
  public freeSpinCounter:number = 0;

  constructor(_id:number,_balance:number){
    this.balance = _balance;
    this.id = _id;
    this.freeSpin = false;
    this.freeSpinCounter = 0;
  }

}
