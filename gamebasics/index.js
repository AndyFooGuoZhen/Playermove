
import Player from "./Player.js"
import Cartridge from "./Cartridge.js"
import EnemyCreation from "./EnemyCreation.js"
import Sprite from "./Sprite.js"

const spriteHeight = 120
const spriteWidth = 100

const parent = document.getElementById('parent')

const canvas = document.querySelector('canvas')
canvas.width = parent.clientWidth
canvas.height = parent.clientHeight

canvas.style.marginRight= "auto"
canvas.style.marginLeft = "auto"

const ctx = canvas.getContext('2d')

const background = new Sprite({
    canvas: canvas,
    position: {
        x: 0,
        y: 0
    },
    imgSrc: './background.png',
    size: {
        width: canvas.width,
        height: canvas.height
    }
})

const cartridge = new Cartridge(canvas)

const player = new Player({
    position: {
        x: canvas.width / 2 - spriteWidth / 2,
        y: canvas.height / 2 - spriteHeight / 2
    },
    speed: {
        x: 0,
        y: 0
    },
    cartridge: cartridge,
    canvas: canvas,
    size: {
        width: spriteWidth,
        height: spriteHeight
    },
    imgSrc: './duck.png'
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
        console.log(player.health)
        if (player.health <= 1) {
            window.cancelAnimationFrame(req)
            setTimeout(() => window.open("losing.html"), 3000)
        }
        else {
            //UPDATE ONSCREEN
            window.cancelAnimationFrame(req)
           setTimeout(restart(), 4000)  
              }

    }

}

function restart() {
    player.health -= 1
    console.log(player.health)
    enemyCreation.clear()
    animate()
}


window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


