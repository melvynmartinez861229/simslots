// Define the types for the prize and the line verification result
export type Prize = number[];
export type LineResult = { Number: number; Count: number; LineID: number };

export interface winResult {
  matrix: number[][];
  info: {
      profit: number;
      lines: LineResult[];
      multiplier: number;
  };
}

export class Matrix {
  // Generate a random integer between min and max
  public static getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate a matrix with random numbers
  private static generateMatrix = (): number[][] => {
    // Dimensions of the matrix
    const rows = 3;
    const columns = 5;

    // Create the matrix
    const matrix: number[][] = new Array(rows)
      .fill(0)
      .map(() => new Array(columns).fill(0));

    // Fill the matrix with random numbers between 0 and 12
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (j === 0 || j === 4) matrix[i][j] = this.getRandomInt(1, 12);
        else matrix[i][j] = this.getRandomInt(0, 12);
      }
    }
    return matrix;
  };

  // Define the prize matrix
  private static premios: Prize[] = [
    [8, 20, 80, 400],
    [0.8, 6, 40, 200],
    [0, 2, 10, 40],
    [0, 2, 20, 50],
    [0.8, 10, 60, 300],
    [0, 2, 10, 40],
    [4, 80, 800, 4000],
    [0, 2, 10, 40],
    [0, 2, 10, 40],
    [0, 2, 20, 50],
    [0.8, 10, 60, 300],
    [0, 2, 10, 40],
    [0, 6, 40, 200],
  ];

  public static lineasGanadoras: number[][] = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [1, 0, 0, 0, 1],
    [1, 2, 2, 2, 1],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 2, 1, 0, 1],
    [1, 0, 1, 2, 1],
    [0, 1, 1, 1, 0],
    [2, 1, 1, 1, 2],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [1, 1, 0, 1, 1],
    [1, 1, 2, 1, 1],
    [0, 0, 2, 0, 0],
    [2, 2, 0, 2, 2],
    [0, 2, 2, 2, 0],
    [2, 0, 0, 0, 2],
    [1, 2, 0, 2, 1],
    [1, 0, 2, 0, 1],
    [0, 2, 0, 2, 0],
    [2, 0, 2, 0, 2],
  ];

  /**
 *
Iniciar un arreglo de resultados: Se inicializa un arreglo result para almacenar los resultados de la verificación de líneas.
Iterar sobre las líneas: Se itera sobre el arreglo de líneas ganadoras (lineasGanadoras) y para cada línea:
Obtener el número inicial de la línea: Se obtiene el número inicial de la línea en la matriz (matrix[line]).
Contar los elementos iguales: Se itera sobre los elementos de la línea, comenzando desde el segundo elemento (j = 1), y se cuenta la cantidad de elementos iguales al número inicial o que sean 1.
Verificar si la línea es ganadora: Si la cantidad de elementos iguales es mayor o igual a 1, se considera que la línea es ganadora y se agrega un objeto LineResult al arreglo result con la información de la línea.
Devolver el resultado: Se devuelve el arreglo result con los resultados de la verificación de líneas.
 */
  private static verifyLines(
    matrix: number[][],
    countLines: number
  ): LineResult[] {
    let result: LineResult[] = [];
    for (let index = 0; index < countLines; index++) {
      const line = this.lineasGanadoras[index];
      const number = matrix[line[0]][0];
      let count = 0;
      for (let j = 1; j < line.length; j++) {
        if (number === matrix[line[j]][j] || matrix[line[j]][j] === 1) {
          count += 1;
        } else {
          break;
        }
      }
      if (count >= 1) {
        result.push({ Number: number, Count: count, LineID: index });
      }
    }
    return result;
  }

/**
 *
Verificar las líneas de la matriz: Se llama al método verifyLines(matrix, countLines) para verificar todas las líneas de la matriz y obtener un arreglo de LineResult que contiene información sobre las líneas ganadoras.
Calcular el multiplicador de la ganancia: Se itera sobre el arreglo de líneas ganadoras (lines) y se calcula el multiplicador de la ganancia. Para cada línea ganadora, se obtiene el premio correspondiente de la matriz premios y se agrega al multiplicador si el premio es mayor que 0. Si el premio es 0, se marca la línea como null en el arreglo lines.
Filtrar las líneas válidas: Se filtra el arreglo lines para eliminar las líneas marcadas como null, obteniendo solo las líneas ganadoras válidas.
Devolver el resultado: Si el arreglo de líneas ganadoras (lines) tiene al menos una línea, se devuelve un objeto con las líneas ganadoras y el multiplicador de la ganancia. Si no hay líneas ganadoras, se devuelve null.
*/
  private static validateMatrix = (matrix: number[][], countLines: number) => {
    let lines = this.verifyLines(matrix, countLines);

    let multiplier = 0;
    lines.forEach((info, index) => {
      const prize = this.premios[info.Number];
      if (prize[info.Count - 1] > 0) {
        multiplier += prize[info.Count - 1];
      } else {
        lines[index] = null as unknown as LineResult;
      }
    });
    lines = lines.filter((item) => item != null) as LineResult[];
    if (lines.length > 0) {
      return { lines, multiplier };
    }

    return null;
  };

  /**
 *
generateMatrixes: Se encarga de generar múltiples matrices aleatorias. Veamos paso a paso lo que hace:
Inicializar un arreglo de matrices: Se crea un arreglo vacío matrixes para almacenar las matrices generadas.
Generar las matrices: Se itera amount veces y en cada iteración se llama al método generateMatrix() para generar una nueva matriz. Cada matriz generada se agrega al arreglo matrixes.
Devolver el arreglo de matrices: Finalmente, se devuelve el arreglo matrixes que contiene todas las matrices generadas.
 */
  private static generateMatrixes = (amount: number): number[][][] => {
    let matrixes: number[][][] = [];
    for (let index = 0; index < amount; index++) {
      matrixes.push(this.generateMatrix());
    }
    return matrixes;
  };

  /**
   * Genera una matriz ganadora
   * @param {number} lines
   * Cantidad de líneas a validar
   * @param {number} estimatedProfit
   * Cantidad de ganancias estimadas
   * @param {number} bet
   * Apuesta por línea
   * @returns {{matriz: [][], Info: {lines: [{ Number: number, Count: number, LineID: number }],multiplier:number,profit:number}}}
   *
   * La función getWinnerMatrix tiene como objetivo generar una matriz ganadora que cumpla con ciertos criterios específicos.
   * Iniciar un bucle infinito: La función utiliza un bucle while (true) para generar y validar matrices hasta que encuentre una que cumpla con los requisitos.
   * Generar una matriz: Dentro del bucle, se llama al método generateMatrixes(1) para generar una nueva matriz. Se toma la primera matriz del arreglo devuelto, que es la única que se genera.
   * Validar la matriz: Se llama al método validateMatrix(matrix, lines) para verificar si la matriz generada tiene líneas ganadoras. Este método devuelve un objeto con las líneas ganadoras y el multiplicador de la ganancia, o null si no hay líneas ganadoras.
   * Verificar si la matriz es válida: Si el resultado de la validación es null, significa que la matriz no tiene líneas ganadoras, por lo que se continúa con la siguiente iteración del bucle.
   * Calcular la ganancia estimada: Si la matriz tiene líneas ganadoras, se calcula la ganancia estimada multiplicando el multiplicador de la ganancia por la apuesta por línea (bet).
   * Verificar si la ganancia estimada está dentro del rango aceptable: Se calcula un límite inferior y un límite superior de la ganancia estimada, que son el 80% y el 120% del valor de estimatedProfit, respectivamente. Si la ganancia estimada no está dentro de este rango, se continúa con la siguiente iteración del bucle.
   * Verificar si la matriz tiene demasiados ceros: Se cuenta la cantidad de ceros en la matriz. Si hay 3 o más ceros, se continúa con la siguiente iteración del bucle, ya que se considera que una matriz con demasiados ceros no es deseable.
   * Devolver la matriz y la información de la ganancia: Si la matriz cumple con todos los requisitos, se devuelve un objeto con la matriz y la información de la ganancia, incluyendo las líneas ganadoras, el multiplicador y la ganancia estimada.
   *
   */
  public static getWinnerMatrix = (
    lines: number,
    estimatedProfit: number,
    bet: number
  ) => {
    console.log("Tamo aqui")
    console.log("estimatedProfit: ",estimatedProfit)
    console.log("lines: ", lines)
    console.log("bet: ", bet)
    while (true) {
      const matrix = this.generateMatrixes(1)[0];
      const result = this.validateMatrix(matrix, lines);
      const limiteInferior = estimatedProfit * 0.6;
      const limiteSuperior = estimatedProfit * 1.4;
      if (result == null) continue;

      const profit = result.multiplier * bet;

      if (!(profit >= limiteInferior && profit <= limiteSuperior)) continue;

      let countBrowser = 0;
      matrix.forEach((element) => {
        countBrowser += element.filter((el) => el === 0).length;
      });
      if (countBrowser >= 3) continue;

      const winResult:winResult = {
        matrix: matrix,
        info: {
          profit,
          lines: result.lines,
          multiplier: result.multiplier
        }
      }
      //return { matrix, info: { ...result, profit } };
      return winResult;
    }
  };

  /**
 * Genera una matriz perdedora
 * @param {number} lines
 * Cantidad de líneas a validar
 * @returns {{matriz: [][]}}
 * La función getLoserMatrix tiene como objetivo generar una matriz perdedora, es decir, una matriz que no tenga líneas ganadoras. Veamos paso a paso lo que hace:
  Iniciar un bucle infinito: La función utiliza un bucle while (true) para generar y validar matrices hasta que encuentre una que no tenga líneas ganadoras.
  Generar una matriz: Dentro del bucle, se llama al método generateMatrixes(1) para generar una nueva matriz. Se toma la primera matriz del arreglo devuelto, que es la única que se genera.
  Validar la matriz: Se llama al método validateMatrix(matrix, lines) para verificar si la matriz generada tiene líneas ganadoras. Este método devuelve un objeto con las líneas ganadoras y el multiplicador de la ganancia, o null si no hay líneas ganadoras.
  Verificar si la matriz es perdedora: Si el resultado de la validación es null, significa que la matriz no tiene líneas ganadoras, por lo que se devuelve un objeto con la matriz.
  Continuar el bucle: Si el resultado de la validación no es null, significa que la matriz tiene líneas ganadoras, por lo que se continúa con la siguiente iteración del bucle para generar una nueva matriz.
*/
  public static getLoserMatrix(lines: number) {
    while (true) {
      const matrix = this.generateMatrixes(1)[0];
      const result = this.validateMatrix(matrix, lines);
      if (result == null) return  matrix ;
    }
  }
}
