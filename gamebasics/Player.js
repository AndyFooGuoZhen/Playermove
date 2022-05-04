import Sprite from "./Sprite.js";

export default class Player extends Sprite {
    delay = 13
    bulletSpeed = 8;
    playerSpeed = 5
    lastMove = null;
    movePressed = null;
    lastShoot = null;

    keys = {
        w: {
            pressed : false
        },
        a: {
            pressed : false
        },
        s: {
            pressed : false
        },
        d: {
            pressed : false
        },
        up: {
            pressed : false
        },
        down: {
            pressed : false
        },
        left: {
            pressed : false
        },
        right: {
            pressed : false
        }   
    }

    constructor({position, size, speed, cartridge, imgSrc, canvas}) {
        super({position, imgSrc, canvas, size})

        this.speed = speed
        this.cartridge = cartridge
        this.health = 3

        this.width = 100
        this.height = 120

        document.addEventListener("keydown", this.keydown)
        document.addEventListener("keyup", this.keyup)

    }

    update() {
        this.move()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        super.update()
        this.shoot()

    }

    move() {
        if (this.keys.w.pressed ) {
            if (this.keys.a.pressed) {
                this.speed.x = -this.playerSpeed
                this.speed.y = -this.playerSpeed
            }
            else if (this.keys.d.pressed) {
                this.speed.x = this.playerSpeed
                this.speed.y = -this.playerSpeed
            }
            else {
                this.speed.x = 0
                this.speed.y = -this.playerSpeed
            }
        }
        else if (this.keys.a.pressed ) {
            if (this.keys.s.pressed) {
                this.speed.x = -this.playerSpeed
                this.speed.y = this.playerSpeed
            }
            else {
                this.speed.x = -this.playerSpeed
                this.speed.y = 0
            }
        }
        else if (this.keys.s.pressed ) {
            if (this.keys.d.pressed) {
                this.speed.x = this.playerSpeed
                this.speed.y = this.playerSpeed
            }
            else {
                this.speed.x = 0
                this.speed.y = this.playerSpeed
            }
        }  
        else if (this.keys.d.pressed ) {
            this.speed.x = this.playerSpeed
            this.speed.y = 0
        }  
        else {
            this.speed.x = 0
            this.speed.y = 0
        } 
    }

    checkCollision(sprite){
        return (this.position.x < sprite.position.x + sprite.width + 10 &&
            this.position.x + this.width > sprite.position.x + 10 &&
            this.position.y < sprite.position.y + sprite.height + 10 &&
            this.position.y + this.height + 10> sprite.position.y)
    }

    shoot() {
        if (this.keys.up.pressed) {
            if (this.keys.left.pressed) {
                this.controller(-this.bulletSpeed, -this.bulletSpeed)
            }
            else if (this.keys.right.pressed) {
                this.controller(this.bulletSpeed, -this.bulletSpeed)
            }
           else this.controller(0, -this.bulletSpeed)
        }
        else if (this.keys.left.pressed) {
            if (this.keys.down.pressed) {
                this.controller(-this.bulletSpeed, this.bulletSpeed)
            }
            else this.controller(-this.bulletSpeed, 0)
        }
        else if (this.keys.down.pressed ) {
            if (this.keys.right.pressed) {
                this.controller(this.bulletSpeed, this.bulletSpeed)
            }
            else this.controller(0,this.bulletSpeed)
        }  
        else if (this.keys.right.pressed) {
            this.controller(this.bulletSpeed,0)
        }  
    }

    controller(x, y) {
        const posX = this.position.x + this.width / 2;
        const posY = this.position.y + this.height / 2;

        this.cartridge.shoot({
            position: {
                x: posX,
                y: posY
            },
            speed: {
                x: x,
                y: y
            }, 
            delay: this.delay})
    }

    keydown = e => {
        switch (event.key) {
            case 'W':
            case 'w':
                this.lastMove = 'w'
                this.keys.w.pressed = true
                break;
            case 'A':
            case 'a':
                this.lastMove = 'a'
                this.keys.a.pressed = true
                break;
            case 'S':
            case 's':
                this.lastMove = 's'
                this.keys.s.pressed = true
                break;
            case 'D':
            case 'd':
                this.lastMove = 'd'
                this.keys.d.pressed = true
                break;
            case 'ArrowUp':
                this.lastShoot = 'up'
                this.keys.up.pressed = true
                break;
            case 'ArrowDown':
                this.lastShoot = 'down'
                this.keys.down.pressed = true
                break;
            case 'ArrowLeft':
                this.lastShoot = 'left'
                this.keys.left.pressed = true
                break;
            case 'ArrowRight':
                this.lastShoot = 'right'
                this.keys.right.pressed = true
                break;
        }
    }

    keyup = (e) => {
        switch (event.key) {
            case 'W':
            case 'w':
                this.keys.w.pressed = false
                break;
            case 'A':
            case 'a':
                this.keys.a.pressed = false
                break;
            case 'S':
            case 's':
                this.keys.s.pressed = false
                break;
            case 'D':
            case 'd':
                this.keys.d.pressed = false
                break;
            case 'ArrowUp':
                this.keys.up.pressed = false
                break;
            case 'ArrowDown':
                this.keys.down.pressed = false
                break;
            case 'ArrowLeft':
                this.keys.left.pressed = false
                break;
            case 'ArrowRight':
                this.keys.right.pressed = false
                break;

        }
    }

}