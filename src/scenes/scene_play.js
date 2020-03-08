import Palas from '../gameObjects/palas.js'
class Scene_play extends Phaser.Scene {
    constructor() {
        super({key: "Scene_play"})
    }

    create() {
        //Centro de la pantalla
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        
        //Separador
        this.add.image(center_width, center_height, "separator")

        //Palas
        //Creacion de pala izda
        this.left_pallete = new Palas(this, 30, center_height, "left_pallete");
        //Creacion de pala dcha
        this.right_pallete = new Palas(this, this.sys.game.config.width - 30, center_height, "right_pallete");

        //Bola
        //Colision con izquierda, derecha, arriba, abajo
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height,"ball");//physics es para añadirle fisicas
        this.ball.setCollideWorldBounds(true);//Esto es para que choque con los limites del mapa
        this.ball.setBounce(1);//Esto es para hacer que revote con la misma velocidad con la que choca
        this.ball.setVelocityX(-180)

        //Fisicas
        this.physics.add.collider(this.ball, this.left_pallete,this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.right_pallete,this.chocaPala, null, this);

        //Controles
        //Pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();

        //Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        if(this.ball.x < 0) {
            this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);

            let puntosJugador2 = document.getElementById("jugador2");
            puntosJugador2.textContent = parseInt(puntosJugador2.textContent) + 1;
        } else if (this.ball.x > this.sys.game.config.width) {
            this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
            let puntosJugador1 = document.getElementById("jugador1");
            puntosJugador1.textContent = parseInt(puntosJugador1.textContent) + 1;
        }
        
        //Control pala derecha
        if (this.cursor.down.isDown) {
            this.right_pallete.body.setVelocityY(300);
        } else if(this.cursor.up.isDown) {
            this.right_pallete.body.setVelocityY(-300);
        } else {
            this.right_pallete.body.setVelocityY(0);
        }

        //Control pala izquierda
        if (this.cursor_S.isDown) {
            this.left_pallete.body.setVelocityY(300);
        } else if(this.cursor_W.isDown) {
            this.left_pallete.body.setVelocityY(-300);
        } else {
            this.left_pallete.body.setVelocityY(0);
        }
    }

    chocaPala() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}

export default Scene_play;