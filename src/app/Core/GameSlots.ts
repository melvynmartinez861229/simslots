import { winningLines, awards, lines } from './GameSlots.Helpers';
import { Matrix, winResult } from './Matrix';

/** Interface para el Spin */
export interface ISpin {
  /** Lineas */
  lines: number;
  /** Apuesta */
  bet: number;
  /** Retorno al jugador */
  rtp: number;
  /** Volatilidad */
  volatility: number;
}

/** Interface para el Resultado del Spin */
export interface IResult {
  /** contador */
  spinNumber: number;
  /** data del Spin */
  dataSpin: ISpin;
  /** Matriz de simbolos */
  matrix: number[][];
  /** Lineas ganadoras */
  winLines: number[];
  /** Cantidad de monedas ganadas */
  win: number;
  /** Cantidad de monedas para banca por concepto de -RTP */
  rtp: number;
  /** Log del Game */
  gameLog: GameLog | undefined;
}

export interface GameLog {
  balance: number;
  statusBalance: string;
  decisor: string;
  withholdings: string | undefined;
}

export class GameSlots {
  //configuracion de cartas
  /** El llamado  */
  public static jokerCard = 0;
  public static scatterCard: 13;
  public static normalCards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  /** Balance Inicial del juego */
  public static initialBalance: number = 10000;
  /** Balance del juego */
  public static balance: number = 0;
  /** Contador de Spines */
  public static counter: number = 0;
  public static withholdings: number = 0;

  /** Volatilidad y RTP del juego */
  public static volatility: number;
  public static rtp: number;

  public static initialize() {
    this.balance = this.initialBalance;
  }
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Jugar */
  public static play(/** datos de la Spin*/ dataSpin: ISpin): IResult {
    /** contador de Spin */
    this.counter++;

    let result: IResult = {
      spinNumber: this.counter,
      dataSpin,
      matrix: [],
      winLines: [],
      win: 0,
      rtp: 0,
      gameLog: undefined,
    };

    // obtener el precio por linea (Apuesta entre lineas)
    let pricePerLine = dataSpin.lines / dataSpin.bet;

    //estado del saldo del juego
    let statusBalance: string | undefined = undefined;

    if (this.balance < this.initialBalance * 0.85) {
      statusBalance = 'very low';
    } else if (this.balance < this.initialBalance * 0.95) {
      statusBalance = 'low';
    } else if (this.balance < this.initialBalance * 1.15) {
      statusBalance = 'normal';
    } else if (this.balance < this.initialBalance * 1.25) {
      statusBalance = 'high';
    } else {
      statusBalance = 'very high';
    }

    result.gameLog = GameSlots.SetGameLogStatus(statusBalance);

    //si el saldo es insuficiente

    //resultado del DADO
    let isWin = this.generateWinOrLose();
   // console.log(GameSlots.withholdings)
    // si la retencion es mayor que la apuesta devolver una parte
    if (dataSpin.bet < GameSlots.withholdings) {
      result.gameLog.withholdings = 'La apuesta es menor a la recepción. Se puede devolver en base el RTP.'
    } else {
      result.gameLog.withholdings = 'La apuesta es mayor a la recepción. No se debe devolver en base el RTP.'
    }

    //calculo de retencion
    let withholdingsResult = GameSlots.withholdings * dataSpin.rtp;
    //si gana:
    //si pierde: (la retencion sera del % respecto al RTP)
    //HEchale un ojo aca
    const withholdingsToWin = GameSlots.getRandomNumber(10, dataSpin.bet * 10);
    console.log("Ramdom: " ,withholdingsToWin)
    console.log("Before:  "+ GameSlots.withholdings)
    if (isWin || GameSlots.withholdings > withholdingsToWin) {
     // console.log(`Bet: ${dataSpin.bet} Rtp: ${dataSpin.rtp} total: ${withholdingsResult}`)
      let theMatrix:winResult = Matrix.getWinnerMatrix(dataSpin.lines,withholdingsResult,dataSpin.bet);
      GameSlots.withholdings -=  theMatrix.info.profit;
      console.log("After:  "+ GameSlots.withholdings)
      console.table(theMatrix.matrix);
    } else {
      //Calcular el saldo en Base al RTP (retorno al jugador).
      withholdingsResult = dataSpin.bet * dataSpin.rtp;
      //console.log(">>>>>   "+withholdingsResult);
      GameSlots.withholdings += withholdingsResult;
      //enviar la diferencia al saldo del juego.
      GameSlots.balance += dataSpin.bet - withholdingsResult;
      //generar una Matriz perdedora
      //console.log("!!!!!!!!!!  "+ GameSlots.balance)
    }

    return result;
  }

  //** Gana o Pierde basado en Volatilidad */
  private static generateWinOrLose(): boolean {
    let random = Math.random();
    // Probabilidad de ganar basada en la volatilidad
    let probability = this.volatility;
    // Si el número aleatorio es menor que la probabilidad, el jugador gana
    return random < probability;
  }

  //generar matriz aleatoria de 3x5 con numeros aleatorios de 0 a 13
  private static generateMatrix(): number[][] {
    let matrix: number[][] = [];
    for (let i = 0; i < 3; i++) {
      matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        matrix[i][j] = Math.floor(Math.random() * 14);
      }
    }
    return matrix;
  }


  static SetGameLogStatus(type: string): GameLog {

    let result!:GameLog;
    //console.log(result);
    switch (type) {
      case 'very low':
        result = {
          balance: this.balance,
          statusBalance: 'Muy Bajo!',
          decisor: 'Recuperar saldo inmediatamente!',
          withholdings: '',
        };
        break;
      case 'low':
        result = {
          balance: this.balance,
          statusBalance: 'Bajo!',
          decisor: 'Devolver RTP cuidadosamente!',
          withholdings: '',
        };
        break;
      case 'normal':
        result = {
          balance: this.balance,
          statusBalance: 'Normal',
          decisor: 'Devolver RTP cuidadosamente!',
          withholdings: '',
        };
        break;
      case 'high':
        result = {
          balance: this.balance,
          statusBalance: 'Alto',
          decisor: 'Devolver RTP cuidadosamente!',
          withholdings: '',
        };
        break;
      case 'very high':
        result = {
          balance: this.balance,
          statusBalance: 'Muy Alto!',
          decisor: 'Devolver gran cantidad de RTP!',
          withholdings: '',
        };
        break;
    }

    //console.log(result);
    //console.log(this.balance);
    return result;
  }
}
