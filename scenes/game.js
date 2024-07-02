export default class Game extends Phaser.Scene {
    constructor() {
      super("Game");
    }
  
    init() {
      // Inicialización de variables del juego
      this.gameOver = false;
      this.timer = 60;
      this.score = 0;
      this.shapes = {
        hamburguesa: { points: 10, count: 0 },
        estrella: { points: 50, count: 0 },
      };
    }
  
    preload() {
      // Carga los activos del juego
      this.load.image("fondo", "public/assets/fondo.png");
      this.load.image("personaje", "public/assets/Player.png");
      this.load.image("enemigo", "public/assets/enemigo.png");
      this.load.image("hamburguesa", "public/assets/comidaGalactica.png");
      this.load.image("estrella", "public/assets/estrella.png");
    }
  
    create() {
      // Agrega la imagen de fondo
      this.fondo = this.add.image(400, 300, "fondo").setScale(7);
  
      // Agrega el sprite del jugador
      this.player = this.physics.add.sprite(400, 1100, "personaje");
      this.player.setSize(this.player.width * 0.5, this.player.height * 1);
      this.player.setCollideWorldBounds(true);
  
      // Configura los controles de entrada
      this.cursor = this.input.keyboard.createCursorKeys();
      this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  
      // Crea grupos para recolectables y enemigos
      this.recolectables = this.physics.add.group();
      this.enemigos = this.physics.add.group();
  
      // Configura temporizadores para generar recolectables y enemigos, y para el temporizador del juego
      this.time.addEvent({
        delay: 2000,
        callback: this.onrecolect,
        callbackScope: this,
        loop: true,
      });
      this.time.addEvent({
        delay: 5000,
        callback: this.onenemy,
        callbackScope: this,
        loop: true,
      });
      this.time.addEvent({
        delay: 1000,
        callback: this.updateTimer,
        callbackScope: this,
        loop: true,
      });
  
      // Muestra elementos de UI
      this.timerText = this.add.text(10, 10, `Tiempo restante: ${this.timer}`, {
        fontSize: "40px",
        fill: "#ffff",
      });
  
      this.scoreText = this.add.text(10, 50, `Puntaje: ${this.score}`, {
        fontSize: "40px",
        fill: "#ffff",
      });
  
      // Configura las colisiones entre el jugador y recolectables/enemigos
      this.physics.add.collider(this.player, this.recolectables, this.onShapeCollect, null, this);
      this.physics.add.collider(this.player, this.enemigos, this.onShapemort, null, this);
    }
  
    update() {
      // Maneja la condición de fin de juego
      if (this.timer <= 0) {
        this.showEnd();
      }
  
      // Maneja el movimiento del jugador
      if (this.cursor.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.setScale(-1,1);
        this.player.body.offset.x = 220;
        this.player.anims.play("left", true);
  
      } else if (this.cursor.right.isDown) {
        this.player.setVelocityX(160);
        this.player.setScale(1,1);
        this.player.body.offset.x = 75;
        this.player.anims.play("right", true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("idle", true);
      }
    }
  
    onrecolect() {
      const tipos = ["hamburguesa", "estrella"];
      const tipo = Phaser.Math.RND.pick(tipos);
      let recolectables = this.recolectables.create(
        Phaser.Math.Between(10, 790),
        0,
        tipo
      );
      recolectables.setVelocity(0, 100);
      recolectables.setSize(recolectables.width * 0.2, recolectables.height * 0.2).setScale(2.5);
  
      recolectables.setData("points", this.shapes[tipo].points);
      recolectables.setData("tipo", tipo);
    }
  
    onenemy() {
      const tipos = ["enemigo"];
      const tipo = Phaser.Math.RND.pick(tipos);
      let enemigos = this.enemigos.create(
        Phaser.Math.Between(10, 790),
        0,
        tipo
      );
      enemigos.setVelocity(0, 100);
      enemigos.setSize(enemigos.width * 0.2, enemigos.height * 0.2).setScale(4);
    }
  
    onShapeCollect(player, recolectables) {
      const nombreFig = recolectables.getData("tipo");
      const points = recolectables.getData("points");
  
      this.score += points;
      this.shapes[nombreFig].count += 1;
  
      console.table(this.shapes);
      console.log("recolectado", recolectables.texture.key, points);
      console.log("score ", this.score);
  
      // Verifica si el objeto recolectado es una hamburguesa y agrega 10 segundos al temporizador
      if (nombreFig === "hamburguesa") {
        this.sumarTiempo();
      }
  
      recolectables.destroy();
  
      this.scoreText.setText(`Puntaje: ${this.score}`);
    }
  
    onShapemort() {
      this.scene.start("End");
    }
  
    updateTimer() {
      this.timer -= 1;
      this.timerText.setText(`Tiempo restante: ${this.timer}`);
    }
  
    sumarTiempo() {
      this.timer += 10;
      this.timerText.setText(`Tiempo restante: ${this.timer}`);
    }
  
    showEnd() {
      this.scene.start("End");
    }
  }