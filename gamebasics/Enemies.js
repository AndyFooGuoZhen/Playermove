import Enemy from "./Enemy.js"
import PowerUps from "./PowerUps.js"

export default class Enemies {
    width = 100
    height = 90
    middleSlotX = 360
    middleSlotY = 390 
    enemies = []
    score = 0
    canvas = null
    powerup = null
    imgSrc = './enemy.png'
    constructor(canvas, cartridge, player) {
        this.scoreTxt = document.getElementById('score')
        this.cartridge = cartridge
        this.player = player
        this.canvas = canvas 
    }

    push(rand) {
        switch(rand) {
            case 0:
                this.enemies.push(new Enemy({
                    position: {
                        x: -this.width/2,
                        y: Math.random()* (720 - this.height - 360) + 360
                    }, 
                    size: {
                        width: this.width,
                        height: this.height
                    },
                    imgSrc: this.imgSrc,
                    speed: {
                        x: 1,
                        y: 0
                    }, canvas: this.canvas, player: this.player
                }))
                break;
            case 1:
                this.enemies.push(new Enemy({
                    position: {
                        x: Math.random()* (785 - this.width - 395) + 395,
                        y: -this.height/2
                    }, size: {
                        width: this.width,
                        height: this.height
                    },
                    imgSrc: this.imgSrc,
                    speed: {
                        x: 0,
                        y: 1
                    }, canvas: this.canvas, player: this.player
                }))
                break;
            case 2:
                this.enemies.push(new Enemy({
                    position: {
                        x: this.canvas.width + this.width/2,
                        y: Math.random()* (720 - this.height - 360) + 360
                    }, size: {
                        width: this.width,
                        height: this.height
                    },
                    imgSrc: this.imgSrc,
                    speed: {
                        x: -1,
                        y: 0
                    }, canvas: this.canvas, player: this.player
                }))
                break;
            case 3:
                this.enemies.push(new Enemy({
                    position: {
                        x: Math.random()* (785 - this.width - 395) + 395,
                        y: this.canvas.height + this.height/2
                    }, size: {
                        width: this.width,
                        height: this.height
                    },
                    imgSrc: this.imgSrc,
                    speed: {
                        x: 0,
                        y: -1
                    }, canvas: this.canvas, player: this.player
                }))
                break;
        }
    }

    update() {
        if (this.powerup != null) {
            this.powerup.draw()
            if (this.player.checkCollision(this.powerup)) {
                this.cartridge.powerup = 1
                this.powerup = null
            }
        }
        this.enemies.forEach((enemy) => {
            enemy.update()
        })
    }

    checkCollision(player) {
        this.enemies.forEach((enemy) => {
            if (this.cartridge.checkCollision(enemy)) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                this.score += 10
                this.scoreTxt.innerHTML = this.score

                let rand = Math.floor(Math.random()*5)
                console.log(rand)
                if (rand == 0) {
                    this.powerup = new PowerUps({
                        canvas: this.canvas,
                        position: {
                            x: enemy.position.x + enemy.width/2,
                            y: enemy.position.y + enemy.height/2
                            },
                        cartridge: this.cartridge,
                        player: player
                         })
                        this.powerup.draw()    
                }
            }
        });

        return this.enemies.some((enemy) => {
            if (player.checkCollision(enemy)) {
                return true;
            }
        })
    }
    getScore() {
        return this.score
    }
    clear(){
       this.enemies.splice(0, this.enemies.length)
   }
}