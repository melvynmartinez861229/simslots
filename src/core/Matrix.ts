import { Helpers } from './Helpers';

export interface MatrixResult {
  matrix: number[][];
  winner: boolean | undefined;
  linesWinner: number[] | undefined;
  factors:number[] | undefined;
}

/**
 * Generador de Matrices
 * */
export class Matrix {
  /**Genera una matrix a partir de una coleccion dada */
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

  /** Generar Matrix con expectación ++ Dopamina */
  public static GenerateWinnerExpectation() {
    let result: MatrixResult = {
      matrix: Helpers.MatrixCleaner,
      winner: undefined,
      linesWinner: undefined,
      factors: undefined
    };

    //busca las colecciones con X2..Xn con factores entre 0.1 - 0.9
    let valuesWithExpectation: number[][] = [];
    for (let i = 0; i < Helpers.CardMultiplier.length; i++) {
      for (
        let cardMultiplierPosition = 0;
        cardMultiplierPosition < Helpers.CardMultiplier[i].length;
        cardMultiplierPosition++
      ) {
        if (
          Helpers.CardMultiplier[i][cardMultiplierPosition] < 1 &&
          Helpers.CardMultiplier[i][cardMultiplierPosition] > 0
        ) {
          valuesWithExpectation.push([i, cardMultiplierPosition]);
          break;
        }
      }
    }

    //Selecciona 1 figura a ganar
    let indexlineToWin: number = Helpers.randomRange(0,valuesWithExpectation.length - 1);

    // Figura que va a ganar
    let figureWinner: number[] = valuesWithExpectation[indexlineToWin];
    let cardWinner = Helpers.Cards[figureWinner[0]];

    //Generar una Colección con valores de figura que no sean la ganadora.
    let cardsContext: number[] = [...Helpers.Cards];
    cardsContext = this.removeValuesFromB(cardsContext, [cardWinner]);

    //preparar matrix base
    result.matrix = this.GenerateMatrix(cardsContext);

    //barajar la coleccion
    for (let i = cardsContext.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsContext[i], cardsContext[j]] = [cardsContext[j], cardsContext[i]];
    }

    //preparar los rodillos 0 y 1
    let first = cardsContext.splice(0, 3);
    let second = cardsContext.splice(0, 3);

    //reemplazar rodillo 0 y 1 de la matrix base
    for (let i = 0; i < 3; i++) {
      result.matrix[i][0] = first[i];
      result.matrix[i][1] = second[i];
    }

    //insertar linea y la figura ganadora!
    let lineID: number = Helpers.randomRange(
      0,
      Helpers.LinesPositions.length - 1
    );
    console.log('lineID', lineID);
    let lineForm: number[] = [...Helpers.LinesPositions[lineID]];
    console.log('lineForm', lineForm);

    //Poner X2!!
    for (let i = 0; i < 2; i++) {
      result.matrix[lineForm[i]][i] = cardWinner;
    }

    console.log('cardWinner', cardWinner);
    console.table(result.matrix);

    return result;
  }

  /** elimina de la coleccion A el contenido de la coleccion B */
  public static removeValuesFromB(A: number[], B: number[]): number[] {
    return A.filter((value: number) => !B.includes(value));
  }

  /** Generar Matrix Perdedora
   * matrix[positionY][rodillo]
   */
  public static GenerateLoser(_inserJoker: boolean, _insertScatter: boolean) {
    let result: MatrixResult = {
      matrix: [...Helpers.MatrixCleaner],
      winner: undefined,
      linesWinner: undefined,
      factors: undefined
    };

    // Primer pase
    for (let i = 0; i < 3; i++) {
      result.matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        result.matrix[i][j] =
          Helpers.Cards[Helpers.randomRange(0, Helpers.Cards.length - 1)]; // Helpers.randomRange(2,13);
      }
    }

    // Create collection random order
    let collectionOrder = [...Helpers.Cards];
    for (let i = collectionOrder.length - 1; i > 0; i--) {
      const j = Helpers.randomRange(0, i);
      [collectionOrder[i], collectionOrder[j]] = [
        collectionOrder[j],
        collectionOrder[i],
      ];
    }

    // Rollers 1 y 2
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
          indexScatter += Helpers.randomRange(0, 2);
        }
      }
    }

    console.table(result.matrix);

    return result;
  }
}
