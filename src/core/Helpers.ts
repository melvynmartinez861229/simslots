export class Helpers {
  /** Simbolo de Scatter */
  public static Scatter: number = 0;

  /** Simbolo de Joker */
  public static Joker: number = 1;

  /** Factor de espectativa */
  public static SpectationValue: number = .30;

  /** Lineas Ganadoras */
  public static Lines: number[][] = [[0]];

  /** Multiplicador de Premio (12 cartas) incluyen a Joker
   * X1, X2, X3, X4, X5
   */
  public static CardMultiplier: number[][] = [
    [0, 0.10, 2.0, 5.0, 10.1], // index 0  || Figura 1 - Joker
    [0, 0.12, 1.8, 4.9, 10.2], // index 1  || Figura 2
    [0, 0.14, 1.6, 4.8, 10.3], // index 2  || Figura 3
    [0, 0.16, 1.4, 4.7, 10.4], // index 3  || Figura 4
    [0, 0.18, 1.2, 4.6, 10.5], // index 4  || Figura 5
    [0, 0.20, 1.0, 4.7, 10.4], // index 5  || Figura 6
    [0, 0.22, 1.2, 4.8, 10.3], // index 6  || Figura 7
    [0, 0.24, 1.4, 4.9, 10.2], // index 7  || Figura 8
    [0, 0.22, 1.6, 5.0, 10.1], // index 8  || Figura 9
    [0, 0.20, 1.8, 4.9, 10.0], // index 9  || Figura 10
    [0, 0.19, 1.8, 4.8, 10.1], // index 10 || Figura 11
    [0, 0.18, 1.6, 4.7, 10.2], // index 11 || Figura 12
    [0, 0.16, 1.4, 4.6, 10.3], // index 12 || Figura 13
  ];

  /** Lineas */
  public static LinesPositions = [
    [1, 1, 1, 1, 1], //Línea 1 --index 0
    [0, 0, 0, 0, 0], //Línea 2 --index 1
    [2, 2, 2, 2, 2], //Línea 3 --index 2
    [0, 1, 2, 1, 0], //Línea 4 --index 3
    [2, 1, 0, 1, 2], //Línea 5 --index 4
    [1, 0, 0, 0, 1], //Línea 6 --index 5
    [1, 2, 2, 2, 1], //Línea 7 --index 6
    [0, 0, 1, 2, 2], //Línea 8 --index 7
    [2, 2, 1, 0, 0], //Línea 9 --index 8
    [1, 2, 1, 0, 1], //Línea 10 --index 9
    [1, 0, 1, 2, 1], //Línea 11 --index 10
    [0, 1, 1, 1, 0], //Línea 12 --index 11
    [2, 1, 1, 1, 2], //Línea 13 --index 12
    [0, 1, 0, 1, 0], //Línea 14 --index 13
    [2, 1, 2, 1, 2], //Línea 15 --index 14
    [1, 1, 0, 1, 1], //Línea 16 --index 15
    [1, 1, 2, 1, 1], //Línea 17 --index 16
    [0, 0, 2, 0, 0], //Línea 18 --index 17
    [2, 2, 0, 2, 2], //Línea 19 --index 18
    [0, 2, 2, 2, 0], //Línea 20 --index 19
    [2, 0, 0, 0, 2], //Línea 21 --index 20
    [1, 2, 0, 2, 1], //Línea 22 --index 21
    [1, 0, 2, 0, 1], //Línea 23 --index 22
    [0, 2, 0, 2, 0], //Línea 24 --index 23
    [2, 0, 2, 0, 2], //Línea 25 --index 24
  ];

  /** Coleccion de cartas */
  public static Cards: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  /** Matriz de limpieza de cartas */
  public static MatrixCleaner: number[][] = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ];

  /** Valor aleatorio entre min y max */
  public static randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
