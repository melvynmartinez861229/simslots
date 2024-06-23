export interface Spin{
  number:number;
}

export interface player{
  id:number;
}

export class BD {

  public static _historicalSpin: Spin[] = [];
  public static _historicalPlayer: player[] = [];

}
