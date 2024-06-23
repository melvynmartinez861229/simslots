/**
 * RESPUESTA DEL CONTROLADOR DE JUEGOS TIPO SLOTS
 */
export interface ISpinResult {
  idCounter:number;
  waveValue:number;
}

/**
 * CONTROLADOR JUEGO TIPO SLOTS
 */
export class GameSlotsController {
  /** Balance del juego */
  public static initialBalance: number = 0;
  public static balanceGame: number = 10000;

  public constructor() {
    GameSlotsController.balanceGame = GameSlotsController.initialBalance;
  }

  public static counter:number = 0;

  public static RTP:number = 0;
  public static Volatilidad: number = 0;

  /**
   * ======================== SPIN!!!
   * @returns ResultGame
   */
  public static spin():ISpinResult {
    this.counter++;
    let waveValue: number = parseFloat(Wave.getValue().toFixed(4));

    let result:ISpinResult = {
      idCounter: this.counter,
      waveValue: waveValue
    };

    return result
  }
}

/**
 * FUNCION DE ONDA
 * */
class Wave {
  public static position: number = 0;
  public static value: number = 0;
  public static amplitudeX: number = 0.01;
  public static amplitudeY: number = 0.02;
  public static amplitudeBotton: number = 0.1;
  public static noise: number = 1;

  public static getValue(): number {
    this.value =
      this.amplitudeBotton +
      (this.amplitudeY - this.amplitudeBotton) * Math.sin(this.position) +
      Math.random() * this.noise;

    this.position += this.amplitudeX;
    if (this.position > 2 * Math.PI) {
      this.position = 0;
    }
    return this.value;
  }
}
