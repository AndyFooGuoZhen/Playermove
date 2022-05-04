
import Player from "./Player.js"
import Cartridge from "./Cartridge.js"
import EnemyCreation from "./EnemyCreation.js"
import Picture from "./Image.js"
import PowerUps from "./PowerUps.js"

const spriteHeight = 90
const spriteWidth = 70

class Background {
    constructor({canvas, position, imgSrc}){
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        this.ctx = canvas.getContext('2d')
        
        canvas.width = window.screen.height + 100
        canvas.height = window.screen.height

        var style = canvas.style
        style.marginLeft = "auto"
        style.marginRight = "auto"
        
    }

    update() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');


const background = new Background({
    canvas: canvas,
    position: {
        x: 0,
        y:0
    },
    imgSrc: './background.png'
})

const cartridge = new Cartridge(canvas)

const player = new Player({
    position: {
        x: canvas.width / 2 - spriteWidth / 2,
        y: canvas.height / 2 - spriteHeight / 2
    }, color: "yellow",
    speed: {
        x: 0,
        y: 0
    },
    cartridge: cartridge,
    canvas: canvas
})

const enemyCreation = new EnemyCreation(canvas, cartridge, player)
//-------------------------FUNCTIONS-------------------------------//


animate()
function animate() {
    var req = window.requestAnimationFrame(animate)
    background.update()
    player.update()
    cartridge.update()
    enemyCreation.levels()
    if (enemyCreation.checkCollision(player)) {
        console.log('stop')
        window.cancelAnimationFrame(req)
    }

}


window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


