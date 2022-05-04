export default class Bullet {
  constructor({ position, color, speed }) {
    this.position = position;
    this.color = color;
    this.speed = speed;
    this.width = 8;
    this.height = 8;
  }

  //MAKE IT MOVE
  update(ctx) {
    //FIX ME
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  checkCollision(sprite) {
    return (
      this.position.x < sprite.position.x + sprite.width &&
      this.position.x + this.width > sprite.position.x &&
      this.position.y < sprite.position.y + sprite.height &&
      this.position.y + this.height > sprite.position.y
    );
  }
}
