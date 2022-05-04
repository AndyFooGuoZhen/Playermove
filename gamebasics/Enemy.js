import Sprite from "./Sprite.js";
export default class Enemy extends Sprite {
    width;
    height;
    constructor ({position,imgSrc, speed, canvas, size, player}) {
        super({position, canvas, imgSrc, size})
        this.speed = speed
        this.ctx = canvas.getContext('2d')
        this.player = player
        this.width = 100
        this.height = 90
    }

    update() {
        if (this != null) {
            if(Math.abs(this.position.x - this.player.position.x) < this.canvas.width/4) {
                this.position.x += Math.min(Math.max(-(this.position.x - this.player.position.x), -1), 1)
            }
            else this.position.x += this.speed.x
            
            if(Math.abs(this.position.y - this.player.position.y) < this.canvas.height/4) {
                this.position.y += Math.min(Math.max(-(this.position.y - this.player.position.y), -1), 1)
            }
            else this.position.y += this.speed.y
        super.update()
    }
    }
}