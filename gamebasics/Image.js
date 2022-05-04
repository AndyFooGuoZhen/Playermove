export default class Picture {
    constructor({canvas, position, imgSrc}){
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        this.ctx = canvas.getContext('2d')

        // canvas.width = window.screen.height + 100
        // canvas.height = window.screen.height

        var style = canvas.style
        style.marginLeft = "auto"
        style.marginRight = "auto"
        
    }

    update() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height)
    }
}