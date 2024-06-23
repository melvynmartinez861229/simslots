export interface IStatisticsResult{
  mean:number;
  median:number;
  mode:number[];
  variance:number;
  standarDesviation:number;
  range:number;
  quartiles:number[];
  iqr:number;
}
export class Statistics {

  public static Mean(data: number[]): number {
   return parseFloat((data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(4));
 }

 public static Median(data: number[]) {
   const sorted = data.slice().sort((a, b) => a - b);
   const mid = Math.floor(sorted.length / 2);
   return sorted.length % 2 !== 0
     ? sorted[mid]
     : (sorted[mid - 1] + sorted[mid]) / 2;
 }

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

 public static Variance(data: number[]): number {
   const mean = this.Mean(data);
   return parseFloat((
     data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
     (data.length - 1)
   ).toFixed(4));
 }

 public static StandardDeviation(data: number[]): number {
   return parseFloat(Math.sqrt(this.Variance(data)).toFixed(4));
 }

 public static Range(data: number[]): number {
   return Math.max(...data) - Math.min(...data);
 }

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

 public static IQR(data: number[]): number {
   const [q1, q2, q3] = this.QUARTILES(data);
   return q3 - q1;
 }

  public static ZScore(data: number[], value: number): number {
   const mean = this.Mean(data);
   const std = this.StandardDeviation(data);
   return (value - mean) / std;
 }

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

 public static Calc(data:number[]):IStatisticsResult
 {
    let result:IStatisticsResult = {
      mean: Statistics.Mean(data),
      median: Statistics.Median(data),
      mode: Statistics.Mode(data),
      variance: Statistics.Variance(data),
      standarDesviation: Statistics.StandardDeviation(data),
      range: Statistics.Range(data),
      quartiles: Statistics.QUARTILES(data),
      iqr: Statistics.IQR(data)
    }
    return result;
 }
}
