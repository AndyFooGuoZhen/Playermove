import Enemies from "./Enemies.js";

export default class EnemyCreation {
    rand = -1
    enemies = null
    interval = 0
    constructor(canvas, cartridge, player, powerups) {
        this.enemies = new Enemies(canvas, cartridge, player, powerups)
    }
    
    update(delay){
        this.rand = Math.floor(Math.random() * 4)
        if (this.interval <= 0) {
            this.enemies.push(this.rand)
            this.interval = delay
        }
        this.enemies.update()
        this.interval--
    }
    
    levels() {
        if (this.enemies.getScore() < 40) {
            this.update(70)
        }
        else if (this.enemies.getScore() < 100) {
            this.update(60)        
        }
        else if (this.enemies.getScore() < 200) {
            this.update(50)        
        }
        else if (this.enemies.getScore() < 400) {
            this.update(30)        
        }
        else {
            this.update(20)    
        }
    }


    checkCollision(player) {
        return this.enemies.checkCollision(player)
    }

    clear(){
        this.enemies.clear()
    }


}