export default class Sprite {
    constructor({canvas, position, imgSrc, size}){
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.size = size
        
    }

    update() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
        console.log(this.image.width, this.image.height)
    }
}