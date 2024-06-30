import {restartbutton} from "../components/restartbutton.js"
export default class menu extends Phaser.Scene {
    constructor() { 
      super("Menu");
      this.restartbutton= new restartbutton(this);
    }
    
      preload(){
        this.load.image("background", "../public/assets/fondo.png");
        this.restartbutton.preload();
      }
      create() {
        this.fondo = this.add.image(400, 300, "background")
        this.fondo.setScale(7);
        this.restartbutton.create();
        this.add.text(50, 50, `iniciar juego`, {
            fontSize: "60px",
           fill: "#ffff",
          });
      }
      
}