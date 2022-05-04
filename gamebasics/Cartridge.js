import Bullet from "./Bullet.js"

export default class Cartridge {
    bullets = []
    timerTillNextBullet = 0;
    canvas = null
    bulletSpeed = 8
    powerup = 0

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    shoot({ position, speed, delay}) {
        if (this.timerTillNextBullet <= 0) {
            if (this.powerup == 1) {
                for (let i = -this.bulletSpeed; i <= this.bulletSpeed; i++) {
                    for (let j = -this.bulletSpeed; j <= this.bulletSpeed; j++){
                        if (i == 0 && j == 0) {
                            continue;
                        }
                        else {
                            this.bullets.push(new Bullet({
                                position: {
                                    x: position.x,
                                    y: position.y
                                },
                                color: "blue",
                                speed: {
                                    x: i,
                                    y: j
                                }
                            }));
                        }
                    }
                }
                this.powerup = 0
            }
            else { 
                this.bullets.push(new Bullet({
                    position: {
                        x: position.x,
                        y: position.y
                    },
                    color: "blue",
                    speed: {
                        x: speed.x,
                        y: speed.y
                    }
                }));
            }
            this.timerTillNextBullet = delay
        }
        this.timerTillNextBullet--;
    }

    isOffScreen(bullet) {
        return  (bullet.position.y <= -bullet.height) ||
                (bullet.position.y >= (bullet.height + this.canvas.height)) ||
                (bullet.position.x <= -bullet.width) ||
                (bullet.position.x >= (bullet.width + this.canvas.width))

    }

    update() {
        this.bullets.forEach((bullet) => {
            if (this.isOffScreen(bullet)){
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }
            bullet.update(this.ctx)})
    }

    checkCollision(sprite) {
        return this.bullets.some((bullet) => {
            if (bullet.checkCollision(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                return true;
            }
            return false;
        });
    }
}