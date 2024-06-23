export interface IWaveConfig {
  amplitudeX: number;
  amplitudeY: number;
  amplitudeBotton: number;
  noise: number;
}

export class Wave {

  public static waveConfig:IWaveConfig = {
    amplitudeX: 0.05,
    amplitudeY: 10,
    amplitudeBotton: 1.2,
    noise: 100
  };
  public static position: number = 0;
  public static value: number = 0;

  public static SetConfig(config:IWaveConfig):void{
    Wave.waveConfig = config;
  }

  public static get():number
  {
    this.value =
      this.waveConfig.amplitudeBotton +
      (this.waveConfig.amplitudeY - this.waveConfig.amplitudeBotton) * Math.sin(this.position) +
      Math.random() * this.waveConfig.noise;

    this.position += this.waveConfig.amplitudeX;
    if (this.position > 2 * Math.PI) {
      this.position = 0;
    }

    this.value = parseFloat(this.value.toFixed(4));
    return this.value;
  }
}
