export default class game extends Phaser.Scene {
  constructor() { 
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.timer = 10;
    this.score = 0;
    this.shapes = {
      hamburguesa: { points: 10, count: 0 },
      estrella: { points: 50, count: 0 },
      
    };
  }
  
  preload() {
    //importar fondo cambiarlo
   this.load.image("fondo", "../public/assets/fondo.png");
   //importar personaje
   this.load.image("personaje","../public/assets/Player.png"); 
   //insertar enemigo
   this.load.image("enemigo","../public/assets/enemigo.png");
   //insertar comida
   this.load.image("hamburguesa","../public/assets/comidaGalactica.png");
   //insertar estrella
   this.load.image("estrella","../public/assets/estrella.png");

  }

  create(){
    this.fondo = this.add.image(400, 300, "fondo")
    this.fondo.setScale(7);

    this.player =this.physics.add.sprite(400, 1100, "personaje"); 
    this.player.setCollideWorldBounds(true);
    

    //add cursors
    this.cursor = this.input.keyboard.createCursorKeys();
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.recolectables = this.physics.add.group();
    this.enemigos= this.physics.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 4000,
      callback: this.onSecond2,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 1000, // 1 segundo
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(10, 10, `Tiempo restante: ${this.timer}`, {
      fontSize: "40px",
     fill: "#ffff",
    });

    this.scoreText = this.add.text(
      10,
      50,
      `Puntaje: ${this.score}`, {
          fontSize: "40px",
          fill:"#ffff",
        }
    );
 

    this.physics.add.collider(this.player, this.recolectables,this.onShapeCollect,null,this);
    //this.physics.add.collider(this.player,this.enemigos);
  
  
  }


  

  update() {
    if (this.timer <= 0) {
      // Detener el juego o realizar alguna acción cuando el tiempo se agota
      this.showEnd();
    }
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-160);
      // play animation
      this.player.anims.play("left", true);
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(160);
      // play animation
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      // play animation
      this.player.anims.play("idle", true);
    }  
  }
  

  onSecond (){
    const tipos = ["hamburguesa","estrella"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectables = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    recolectables.setVelocity(0, 100);
    recolectables.setScale(2.5);
    
    recolectables.setData("points",this.shapes[tipo].points);
    recolectables.setData("tipo",tipo);
  
  }
  onSecond2 (){
    const tipos = ["enemigo"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let enemigos = this.enemigos.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    enemigos.setVelocity(0, 100);
    enemigos.setScale(4);
  
  }
  onShapeCollect(player, recolectables) {
    const nombreFig = recolectables.getData("tipo");
    const points = recolectables.getData ("points");

    this.score+= points;

    this.shapes[nombreFig].count += 1;

    console.table(this.shapes);
    console.log("recolectado",recolectables.texture.key, points);
    console.log("score ", this.score);
    recolectables.destroy();
    
    this.scoreText.setText(
      `Puntaje: ${this.score}`
        
    );  }
    updateTimer() {
      this.timer -= 1;
      this.timerText.setText(`Tiempo restante: ${this.timer}`);

  }
  showEnd(){
    this.scene.start("End");
  }


}



