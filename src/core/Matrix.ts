import { Helpers } from './Helpers';

export interface IMatrixResult {
  matrix: number[][];
  evaluation: IMatrixEvaluationResult | undefined;
  winner: boolean | undefined;
  winnerScatter: boolean | undefined;
  linesWinner: number[] | undefined;
  mapLines:number[][] | undefined;
  cardsWinner: number[] | undefined;
  factors: number[] | undefined;
}

export interface ILineWinner {
  lineID:number,
  card:number,
  cardFactors:number[],
  mapLine:number[],
  Xs:number,
  factor:number,
}

export interface IMatrixEvaluationResult {
  totalLines:number,
  totalFactors:number,
  data:ILineWinner[] | undefined,
}

/**
 *
 * Generador de Matrices
 * matrix[positionY][rodillo]
 *
 * */
export class Matrix {


  /**
   *
   *  EVALUADOR DE LINEAS
   *
   *
   */
  public static evaluateLines(_matrix:number[][], _lines:number):IMatrixEvaluationResult{
    let result:IMatrixEvaluationResult = {
      totalLines: 0,
      totalFactors: 0,
      data: []
    }

    //evaluar los mapas de lineas
    //for (let mapLineCounter = 0; mapLineCounter < Helpers.LinesPositions.length; mapLineCounter++) {
    for (let mapLineCounter = 0; mapLineCounter < _lines + 1; mapLineCounter++) {
      //Obtener el mapa de la linea
      const lineMap = Helpers.LinesPositions[mapLineCounter];
      let x = 0;
      let winner = false
      let card = -1;
      //evaluar si es una linea ganadora...
      if(_matrix[lineMap[0]][0] ==  _matrix[lineMap[1]][1]){
        winner = true;
        x = 1;
        card = _matrix[lineMap[0]][0];
        //recorrer hasta el penultimo elemento del mapa para ver por cuantas X es ganadora
        for (let i = 0; i < lineMap.length-1; i++) {
          if (_matrix[lineMap[i]][i] ==  _matrix[lineMap[i+1]][i+1]){
            x++;
          }else{
            break;
          }
        }
      }

      if (winner) {
        let lineWinner:ILineWinner = {
          lineID: mapLineCounter,
          card: card,
          cardFactors: Helpers.CardMultiplier[card-1],
          mapLine: lineMap,
          Xs: x,
          factor: Helpers.CardMultiplier[card-1][x-1]
        }
        result.data?.push(lineWinner);
      }
    }

    //calcular totales
    if (result.data !== undefined && result.data.length > 0) {
      result.totalLines = result.data.length;
      result.data.forEach((value:ILineWinner) => {
        result.totalFactors += value.factor;
      });
      result.totalFactors = parseFloat(result.totalFactors.toFixed(2));
    }

    return result;
  }

  /**
   *
   * Genera una matrix a partir de una coleccion dada
   *
   * */
  public static GenerateMatrix(collection: number[]): number[][] {
    let _matrixResult: number[][] = [...Helpers.MatrixCleaner];
    for (let i = 0; i < _matrixResult.length; i++) {
      for (let j = 0; j < _matrixResult[i].length; j++) {
        const randomIndex = Math.floor(Math.random() * collection.length);
        _matrixResult[i][j] = collection[randomIndex];
      }
    }
    return _matrixResult;
  }

  /**
   *
   * elimina de la coleccion A el contenido de la coleccion B
   *
   * */
  public static removeValuesFromB(A: number[], B: number[]): number[] {
    return A.filter((value: number) => !B.includes(value));
  }

  /**
   *
   * Barajar cartas
   *
   * */
  public static shuffleCards(data: number[]): number[] {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
  }


  /**
   *
   *
   * ===============================================================   Generar Matrix con expectación: (++ Dopamina)
   *
   *
   * */
  public static GenerateWinnerExpectation(_lines:number):IMatrixResult {

    let result:IMatrixResult = {
      matrix: [],
      evaluation: {
        totalLines: 0,
        totalFactors: 0,
        data: undefined
      },
      winner: undefined,
      winnerScatter: false,
      linesWinner: undefined,
      mapLines: [],
      cardsWinner: undefined,
      factors: undefined
    }

    //Obtener los indices figuras que con X2 esten por encima de 0 y debajo de el valor de espectativa
    let collection:number[] = []
    for (let i = 0; i < Helpers.CardMultiplier.length; i++) {
      if (Helpers.CardMultiplier[i][1] > 0 && Helpers.CardMultiplier[i][1] < Helpers.SpectationValue) {
        collection.push(i);
      }
    }
    //console.log('coleccion de 0.n',collection);

    //seleccionar una carta ganadora
    const cardWinner = (collection[Helpers.randomRange(0, collection.length - 2)]) + 2;
    //console.log('Figura ganadora', cardWinner);

    //seleccionar una linea ganadora
    const lineID:number = Helpers.randomRange(0, _lines);
    const lineWinner:number[] = Helpers.LinesPositions[lineID];
    result.mapLines?.push(lineWinner);
    //console.log('linea ID', lineID);
    //console.log('Linea ganadora', lineWinner);

    //Conformar coleccion perdedora
    let collectionMatrix = [...Helpers.Cards]

    //quitar la carta ganadora de la coleccion
    collectionMatrix = this.removeValuesFromB(collectionMatrix, [cardWinner])
    console.log('coleccion matrix', collectionMatrix);

    //barajar la coleccion
    collectionMatrix = this.shuffleCards(collectionMatrix);
    console.log('coleccion matrix barajada', collectionMatrix);

    //rodillos 0 y 1
    let rolling_0 = collectionMatrix.splice(0, 3);
    let rolling_1 = collectionMatrix.splice(0, 3);

    //generar matrix perdedora
    result.matrix = this.GenerateMatrix(collectionMatrix);
    for (let i = 0; i < 3; i++) {
      result.matrix[i][0] = rolling_0[i]
      result.matrix[i][1] = rolling_1[i]
    }

    //insertar la carta ganadora con la linea gnadora en X2
    result.matrix[lineWinner[0]][0] = cardWinner;
    result.matrix[lineWinner[1]][1] = cardWinner;

    console.table(result.matrix);

    //Agregar de 0 - 2 scatter!
    let cantScatter = Helpers.randomRange(0, 2);
      if (cantScatter > 0) {
        let indexScatter = 2;
        for (let i = 0; i < cantScatter; i++) {
          result.matrix[Helpers.randomRange(0, 2)][indexScatter] =
            Helpers.Scatter;
          indexScatter += Helpers.randomRange(1, 2);
        }
    }

    //agregar los factors
    result.factors = [Helpers.CardMultiplier[cardWinner-1][1]];
    result.cardsWinner = [cardWinner];
    result.linesWinner = [lineID];
    result.winner = true;

    result.evaluation = this.evaluateLines(result.matrix, _lines);

    return result;
  }


/**
 *
 * GENERAR SCATTER -- Premio mayor
 *
 */
  public static GenerateScatter(cant:number):IMatrixResult{

    cant = (cant<3)?3:cant;
    cant = (cant>5)?5:cant;

    let result:IMatrixResult = {
      matrix: this.GenerateLoser(false,false).matrix,
      evaluation: undefined,
      winner: true,
      winnerScatter: true,
      linesWinner: [],
      mapLines: [],
      cardsWinner: [],
      factors: []
    }
    let positions:number[] = this.shuffleCards([0,1,2,3,4]);
    for (let i = 0; i < cant; i++) {
      result.matrix[Helpers.randomRange(0,2)][positions[i]] = Helpers.Scatter;
    }
    return result;
  }


  public static GenerateWinner(_lines:number, amount:number):IMatrixResult{
    let result:IMatrixResult = {
      matrix: [],
      evaluation: undefined,
      winner: undefined,
      winnerScatter: false,
      linesWinner: undefined,
      mapLines: [],
      cardsWinner: undefined,
      factors: undefined
    }

    return result;
  }

  /**
   *
   * =======================================================================   Generar Matrix Perdedora
   * matrix[positionY][rodillo]
   *
   *
   */
  public static GenerateLoser(_inserJoker: boolean, _insertScatter: boolean):IMatrixResult {
    let result: IMatrixResult = {
      matrix: [...Helpers.MatrixCleaner],
      evaluation: undefined,
      winner: false,
      winnerScatter: false,
      linesWinner: [],
      mapLines: [],
      factors: [],
      cardsWinner: []
    };

    // Primer pase
    result.matrix = this.GenerateMatrix([...Helpers.Cards]);

    // crear colleccion de orden aleatorio...
    let collectionOrder = [...Helpers.Cards];
    for (let i = collectionOrder.length - 1; i > 0; i--) {
      const j = Helpers.randomRange(0, i);
      [collectionOrder[i], collectionOrder[j]] = [
        collectionOrder[j],
        collectionOrder[i],
      ];
    }

    // Obtener rodillos 1 y 2
    for (let k = 0; k < 2; k++) {
      let roller = collectionOrder.splice(0, 3);
      for (let i = 0; i < 3; i++) {
        result.matrix[i][k] = roller[i];
      }
    }

    if (_inserJoker) {
      // Insert Joker
      let cantJoker = Helpers.randomRange(0, 2);
      if (cantJoker > 0) {
        let indexJoker = Helpers.randomRange(2, 3);
        for (let i = 0; i < cantJoker; i++) {
          result.matrix[Helpers.randomRange(0, 2)][indexJoker] = Helpers.Joker;
          indexJoker += Helpers.randomRange(0, 2);
          if (indexJoker > 4) {
            indexJoker = 4;
          }
        }
      }
    }

    if (_insertScatter) {
      //Insert Scatter
      let cantScatter = Helpers.randomRange(0, 2);
      if (cantScatter > 0) {
        let indexScatter = Helpers.randomRange(0, 2);
        for (let i = 0; i < cantScatter; i++) {
          result.matrix[Helpers.randomRange(0, 2)][indexScatter] =
            Helpers.Scatter;
          indexScatter += Helpers.randomRange(1, 2);
        }
      }
    }

    return result;
  }
}
