/** FAKE BD */
export interface IGameconfig {
  type:string;
  balance:number;
  rtp:number;
  volatility:number;
}

export interface IPlayer {
  id: number;
  balance: number;
}

export interface ISpin{
  id:number;
  value:number;
}

export class BD {
  /** FAKE TABLE CONFIG GAME */
  public static gameconfig: IGameconfig[] = [];
  public static players:IPlayer[] = [];


  /** FAKE Add Data */
  constructor(){
    BD.gameconfig = [{
      type: "Game Slots",
      balance: 10000,
      rtp: 0.97,
      volatility: 0.8
    }];
  }
}
