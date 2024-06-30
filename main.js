import Menu from "./scenes/Menu.js";
import Game from "./scenes/game.js";
import End from "./scenes/end.js";


const config = {
  type: Phaser.AUTO,
  width: 750,
  height: 1334,
  backgroundcolor:0x444444,
  scale:{
    mode:Phaser.Scale.FIT,
    autoCenter:Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity:{
        y:300
      },
      debug: true,
    },
  },
  
  scene: [Menu,Game,End],
};

window.game = new Phaser.Game(config);
