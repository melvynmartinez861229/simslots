
/**
 *
 * El análisis de datos en estadística descriptiva implica calcular medidas de tendencia central, como la media, mediana y moda, así como medidas de dispersión,
 * como la desviación estándar y el rango. Estas medidas ayudan a describir las características centrales y la variabilidad de los datos.
 */
export class Statistics {
   /**
   *
   * @param data
   * @returns media aritmetica
   *
   * @description La media, también conocida como promedio aritmético, es una medida de tendencia central que se calcula sumando todos los valores de un conjunto de datos y dividiendo la suma por el número total de valores. En términos simples, la media representa el valor típico o central de un conjunto de datos.
   *
   * 1 - Representación del conjunto de datos: La media proporciona un valor representativo del conjunto de datos, lo que facilita la comprensión y la interpretación de la información contenida en los datos.
   *
   * 2 - Comparación de conjuntos de datos: Permite comparar diferentes conjuntos de datos y evaluar cómo se distribuyen los valores en relación con el valor central.
   *
   * 3 - Cálculo de otras medidas estadísticas: La media es utilizada en el cálculo de otras medidas estadísticas, como la varianza, la desviación estándar y el coeficiente de correlación.
   *
   * 4 - Facilita la toma de decisiones: Al proporcionar un valor central, la media puede ayudar en la toma de decisiones basadas en los datos y en la evaluación de resultados.
   */
   public static Mean(data: number[]): number {
    return parseFloat((data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(4));
  }

  /**
   * Calcula la mediana de un conjunto de datos.
   * @param {*} data
   * @returns
   * La mediana es una medida de tendencia central que se utiliza para describir la distribución de un conjunto de datos. Es el valor que separa el 50% de los datos más pequeños del 50% restante. En otras palabras, la mediana es el valor que divide la distribución de los datos en dos partes iguales.
   *
   * 1 - Es resistente a valores atípicos: La mediana es menos afectada por la presencia de valores atípicos o outliers en la distribución de datos.
   *
   * 2 - Es una medida de tendencia central: La mediana es una medida de tendencia central que proporciona información sobre el valor central de la distribución de datos.
   *
   * 3 - Es utilizada en análisis de datos: La mediana se utiliza comúnmente en el análisis de datos para describir la distribución de los datos y para identificar tendencias y patrones.
   *
   * 4 - Es una medida de robustez: La mediana es una medida de robustez, ya que es menos afectada por la presencia de valores atípicos o outliers en la distribución de datos.
   */
  public static Median(data: number[]) {
    const sorted = data.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  /**
   * Calcula la moda de un conjunto de datos.
   * @param {*} data
   * @returns
   * La moda se calcula como el valor que se repite con mayor frecuencia en un conjunto de datos. Para calcular la moda, se sigue estos pasos:
   *
   * 1 - Ordenar los datos: Se ordenan los datos en orden ascendente o descendente.
   *
   * 2 - Contar la frecuencia: Se cuenta cuántas veces aparece cada número en el conjunto de datos.
   *
   * 3 - Identificar el valor más frecuente: El valor que se repite con mayor frecuencia es la moda.
   */
  public static Mode(data: number[]): number[] {
    const counts: { [key: number]: number } = {};
    data.forEach((val) => {
      counts[val] = (counts[val] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts)
      .filter((key) => counts[parseInt(key)] === maxCount)
      .map(Number);
  }

  // Calcula la varianza de un conjunto de datos.
  /**
   *
   * @param {*} data
   * @returns
   * La varianza se utiliza en diversas áreas para evaluar la dispersión de los datos en torno a la media. Algunos de los usos más comunes de la varianza incluyen:
   *
   * 1 - Evaluación de riesgos: En finanzas y ciencias actuales, la varianza se utiliza para evaluar el riesgo asociado con inversiones y pronosticar la volatilidad en los mercados.
   *
   * 2 - Control de calidad: En la producción y manufactura, la varianza se utiliza para monitorear la consistencia y calidad de los productos. Una baja varianza indica una producción más consistente.
   *
   * 3 - Análisis de datos: La varianza es una medida fundamental en estadística que nos proporciona información crucial sobre la dispersión de datos dentro de un conjunto. Comprender este concepto es esencial para cualquier análisis significativo.
   *
   * 4 - Interpretación de datos: La varianza ayuda a entender cuánto se alejan los datos de su media. Una varianza baja indica que los datos están agrupados cerca de la media, mientras que una varianza alta sugiere una mayor dispersión.
   *
   * 5 - Cálculo de la desviación estándar: La varianza se utiliza para calcular la desviación estándar, que es una medida de dispersión que se utiliza para evaluar la variabilidad de los datos en la misma escala que los datos originales.
   *
   * 6 - Análisis de teorías: La varianza se utiliza en el proceso de comprobación de teorías para anticiparse a los posibles resultados y analizar el comportamiento de los valores alrededor de su promedio.
   *
   * 7 - Evaluación de la consistencia: La varianza se utiliza para evaluar la consistencia de los datos y detectar valores atípicos o outliers
   */
  public static Variance(data: number[]): number {
    const mean = this.Mean(data);
    return parseFloat((
      data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      (data.length - 1)
    ).toFixed(4));
  }

  // Calcula la desviación estándar de un conjunto de datos.
  /**
   *
   * @param {*} data
   * @returns
   * Donde:
   * 𝑥𝑖 es cada valor del conjunto de datos.
   *
   * 𝑥ˉ es la media del conjunto de datos.
   *
   * 𝑛 es el número total de datos.
   */
  public static StandardDeviation(data: number[]): number {
    return parseFloat(Math.sqrt(this.Variance(data)).toFixed(4));
  }

  /**
   * Calcula el rango de un conjunto de datos.
   * @param {*} data
   * @returns
   * El rango de un conjunto de datos se calcula como la diferencia entre el valor máximo y el valor mínimo dentro del conjunto. La fórmula para calcular el rango es:
   *
   * R = Máx - Mín
   *
   * Donde:
   *
   * R es el rango.
   *
   * Máx es el valor máximo del conjunto.
   *
   * Mín es el valor mínimo del conjunto.
   */
  public static Range(data: number[]): number {
    return Math.max(...data) - Math.min(...data);
  }

  /**
   * Calcula los cuartiles de un conjunto de datos.
   * @param {*} data
   * @returns
   * Los cuartiles son una medida estadística que se utiliza para dividir una distribución de datos en cuatro partes aproximadamente iguales,
   * cada una conteniendo el 25% de los datos. Los cuartiles se utilizan para:
   *
   * 1 - Dividir la distribución de datos: Los cuartiles permiten dividir una distribución de datos en cuatro partes, lo que facilita la visualización y el análisis de la distribución de los datos.
   *
   * 2 - Identificar patrones y tendencias: Los cuartiles pueden ayudar a identificar patrones y tendencias en los datos, como la distribución de los valores, la presencia de valores atípicos y la forma en que los datos se distribuyen.
   *
   * 3 - Interpretación de datos: Los cuartiles son una herramienta importante para la interpretación de datos, ya que permiten comprender mejor la distribución de los datos y tomar decisiones informadas.
   *
   * 4 - Visualización de datos: Los cuartiles se utilizan comúnmente en la visualización de datos, ya sea mediante gráficos de cuartiles, diagramas de caja o gráficos de violín, para proporcionar una visión más completa de la distribución de los datos.
   *
   * 5 - Análisis de datos: Los cuartiles se utilizan en el análisis de datos para identificar patrones y tendencias, y para comprender mejor la distribución de los datos
   */
  public static QUARTILES(data: number[]): number[] {
    const sorted = data.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const q1 = this.Median(sorted.slice(0, mid));
    const q2 = this.Median(sorted);
    const q3 = this.Median(
      sorted.slice(mid + (sorted.length % 2))
    );
    return [q1, q2, q3];
  }

  /**
   * Calcula el rango intercuartílico de un conjunto de datos.
   * @param {*} data
   * @returns
   * El rango intercuartílico (IQR) es una medida estadística que se calcula como la diferencia entre el tercer cuartil (Q3) y el primer cuartil (Q1) de una distribución de datos. El IQR se utiliza para medir la dispersión interna de los datos, es decir, la dispersión dentro de los datos mismos, en lugar de la dispersión total que incluye la dispersión externa (valores atípicos o outliers).
   *
   * Identifica la dispersión interna: El IQR muestra la dispersión interna de los datos, es decir, la dispersión dentro de los datos mismos, en lugar de la dispersión total que incluye la dispersión externa (valores atípicos o outliers).
   *
   * 1 - Ayuda a identificar outliers: El IQR se utiliza comúnmente para identificar valores atípicos o outliers en una distribución de datos. Si un valor es más grande que Q3 + 1.5 * IQR o más pequeño que Q1 - 1.5 * IQR, se considera un outlier.
   *
   * 2 - Es una medida de robustez: El IQR es una medida de robustez, ya que es menos afectado por la presencia de valores atípicos o outliers en la distribución de datos.
   */
  public static IQR(data: number[]): number {
    const [q1, q2, q3] = this.QUARTILES(data);
    return q3 - q1;
  }


  /**
   * Calcula la puntuación z de un valor en un conjunto de datos.
   * @param {*} data
   * @param {*} value
   * @returns
   * La puntuación z se utiliza para identificar valores atípicos, evaluar la normalidad de una distribución y determinar la probabilidad de que un valor sea parte de una distribución normal. Los valores de puntuación z muy altos o muy bajos se encuentran en las colas de la distribución normal y se asocian con valores p muy pequeños, lo que indica que es poco probable que el valor sea parte de la distribución normal.
   *
   * 1 - Identificar valores atípicos: Los valores con puntuaciones z muy altas o muy bajas se consideran atípicos y pueden ser valores outliers.
   *
   * 2 - Evaluación de normalidad: La puntuación z se utiliza para evaluar si una distribución es normal. Si la mayoría de los valores tienen puntuaciones z dentro de un rango determinado, se puede considerar que la distribución es normal.
   *
   * 3 - Determinación de probabilidades: La puntuación z se utiliza para determinar la probabilidad de que un valor sea parte de una distribución normal. El valor p asociado con una puntuación z indica la probabilidad de que el valor sea parte de la distribución normal.
   */
   public static ZScore(data: number[], value: number): number {
    const mean = this.Mean(data);
    const std = this.StandardDeviation(data);
    return (value - mean) / std;
  }

   /**
   * Calcula el intervalo de confianza para un conjunto de datos.
   * @param {*} data
   * @param {*} confidence
   * @param {*} alternative
   * @returns
   *
   * El intervalo de confianza para un conjunto de datos se calcula para estimar, con un cierto nivel de confianza, el rango dentro del cual se espera que se encuentre un parámetro poblacional desconocido, como la media. Este cálculo se basa en los datos de una muestra y proporciona un rango de valores dentro del cual es probable que se encuentre el verdadero valor del parámetro en la población.
   *
   * En términos simples, el intervalo de confianza es una medida de la precisión de una estimación y proporciona información sobre la variabilidad y la incertidumbre asociadas con la estimación de un parámetro poblacional a partir de una muestra. Un intervalo de confianza típico se expresa como un rango de valores con un nivel de confianza asociado, como el 95% o el 90%.
   */
   public static ConfidenceInterval(
    data: number[],
  ): [number, number] {
    const mean = this.Mean(data);
    const std = this.StandardDeviation(data);
    const n = data.length;
    const tValue = 1.96;
    const margin = tValue * (std / Math.sqrt(n));
    return [mean - margin, mean + margin];
  }
}
