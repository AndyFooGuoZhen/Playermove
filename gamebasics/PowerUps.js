export default class PowerUps {
    constructor({canvas, position, cartridge, player}) {
        this.powerup = -1
        this.player = player
        this.ctx = canvas.getContext('2d')
        this.position = position
        this.width = 20
        this.height = 20
        this.cartridge = cartridge
    }
    /**
     * Every hit enemies have a 1/3 chance to drop a powerup.
     * 
     * @param {} rand 
     */

    draw() {
        this.ctx.fillStyle = "pink"
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}