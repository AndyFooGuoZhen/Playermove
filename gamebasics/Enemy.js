import Player from "./Player.js";
export default class Enemy {
    width;
    height;
    constructor ({position, color, speed, canvas, player}) {
        this.position = position
        this.color = color
        this.speed = speed
        this.ctx = canvas.getContext('2d')
        this.player = player
        this.width = 70
        this.height = 90
        this.canvas = canvas
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
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }
}