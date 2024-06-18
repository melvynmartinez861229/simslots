/** El index 0 representa el número de línea el index 1 la columna */
export const winningLines: number[][] = [
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

/** Premios[][] el index 0 representa la figura, el index 1 los X2,X3,X4,X5 */
export const awards: number[][] = [
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

/** Apuestas */
export const bets: number[] = [4, 8, 20, 40, 80, 200, 400, 800, 1600, 3200];

/** Matriz vacia */
export const emptyMatrix: number[][] = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

/** Coleccion de lineas */
export const lines: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];