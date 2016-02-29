var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // bug dimensions are 101 width and 171 height
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+this.speed*dt;
    this.y = this.y;
    //Reset bug location after moving off game board
    if(this.x > 510){
      this.x = -70;
      this.speed = Math.floor(Math.random() * (180 - 60 + 1)) + 60;
    }
    this.collision();
};
//Credit for collision method goes to Udacity member mcs and Mozilla's 2D game tutorial

Enemy.prototype.collision = function(){
  if(this.x > player.x - 50 && 
    this.x < player.x + 50 && 
    this.y > player.y - 40 &&
    this.y < player.y + 40){
    player.x = 200;
    player.y = 400;
  }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
  //Resets player's location once player reaches river
  if(this.y <= 0){
    this.x = 200;
    this.y = 400;
  }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCodes){
    switch(keyCodes) {
        case "left":
          if(this.x>0){
            this.x = this.x - 55;
          }
          break;
        case "right":
          if(this.x<410){
            this.x = this.x + 55;
          }
          break;
        case "up":
          if(this.y>0+10){
            this.y = this.y - 43;
          }
          break;
        case "down":
          if(this.y<390){
           this.y = this.y + 43;
          }
          break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(i=0;i<3;i++){
  var randSpeed = Math.floor(Math.random() * (180 - 60 + 1)) + 60;
  allEnemies.push(new Enemy(-50,43+i*90, randSpeed));
}

//instantiate player object

var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
