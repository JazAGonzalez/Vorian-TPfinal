export class restartbutton {
    constructor (scene){
        this.releatedScene= scene;
    }

    preload(){
        this.releatedScene.load.image("button","../public/assets/estrella.png");  
    }

    create(){
        this.startButton= this.releatedScene.add.image (400, 230, "button").setInteractive()
        

        this.startButton.on ("pointerdown",()=>{ 
            this.releatedScene.scene.start("Game");
        });
    }

}