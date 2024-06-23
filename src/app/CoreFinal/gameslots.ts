import { BD, IGameconfig } from "./BD";
import { Wave } from "./Wave";
import { Player } from "./player";

/** LOGIC GAME TYPE SLOTS */
export class Gameslots {

  constructor(_id:number){
    this.id = _id;
    this.config = BD.gameconfig[_id];
  }

  public id!:number;
  public config!:IGameconfig;
  public probabilityScatter:number = 0.05;
  public freeSpinLot:number = 14;



  public spinBase(player:Player){

    console.clear();
    console.log(`El player[${player.id}] ha jugado por las lineas:${player.lines}, con una apuesta de ${player.bet}`);
    let valuePerLine:number = parseFloat((player.bet * player.lines).toFixed(2));
    console.log(`El valor por linea es de $ ${valuePerLine}`);
    let waveValue = Wave.get();
    console.log(`El valor de la OndaPura es de ${waveValue}`);

    let rnd = Math.random();


    if (player.freeSpin) {
      if (player.freeSpinCounter >= this.freeSpinLot) {
        player.freeSpin = false
      }
      player.freeSpinCounter++;
      console.log(`Scatter!`);
      console.log(player.freeSpinCounter)
    }
    else
    {
      if(rnd < this.probabilityScatter){
        player.freeSpin = true;
        player.freeSpinCounter = 0;
      }else{
        console.log(`No Scatter!`);
      }
    }

  }

  public spinFree(player:Player){

  }
}
