import { Wave } from './../../CoreFinal/Wave';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gameslots } from '../../CoreFinal/gameslots';
import { Player } from '../../CoreFinal/player';
import { IWaveConfig } from '../../CoreFinal/Wave';

@Component({
  selector: 'app-gameslots',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gameslots.component.html',
  styles: ''
})
export class GameslotsComponent {

  game:Gameslots = new Gameslots(0);
  player:Player = new Player(0,100);
  figures:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  lines:number[] = []
  bets: number[] = [0.01, 0.05, 0.10, 0.25, 0.50, 1.0];
  lineSelect!:number;
  betSelect!:number;

  waveConfig:IWaveConfig = Wave.waveConfig;

  constructor(){
    //generar opciones de lineas
    for (let index = 1; index < 26; index++) {
      this.lines.push(index);
    }
    this.lineSelect = this.lines[0];
    this.betSelect = 0;
  }

  public play(){
    this.player.bet = this.bets[this.betSelect];
    this.player.lines = this.lineSelect;
    this.game.spinBase(this.player);
  }

 public applyWaveConfig(){
    //Wave.waveConfig = this.waveConfig;
    console.table(Wave.waveConfig);
 }
}
