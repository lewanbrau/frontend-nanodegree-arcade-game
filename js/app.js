// Enemies our player must avoid
var Enemy = function(start, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    //The starting location. Can be changed on each enemy created to add variety.
    this.x = start;
    //row is used for setup and colission detection.
    this.row = row;
    //Translated into a y value so that the y location doesn't have to be
    //looked up for each fame.
    this.y = enemyRow[row];
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


//Arrays used to make the code a bit easier to use.
//These serve as translation for many of the functions and classes
var enemyRow = {
    3 : 225,
    4 : 142,
    5 : 59
};

var collisionValues = {
    1 : [-80, 81],
    2 : [21, 182],
    3 : [121, 283],
    4 : [222, 384],
    5 : [323, 485]
};

var playerPosition = {
    "column" : {
        1 : 1,
        2 : 102,
        3 : 203,
        4 : 304,
        5 : 405
        },
    "row" : {
        1 : 400,
        2 : 317,
        3 : 234,
        4 : 151,
        5 : 68
        }
};
//end of arrays

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


//I added this to keep the update function a bit cleaner. As I may have many instances
//of this method, it makes sense.
Enemy.prototype.collision = function() {
    //checks to make sure the player is in the same row as a bug. If it is, it runs the
    //collision calculations
    if (player.row === this.row){
        //iterates on the column numbers
        for (var i = 1; i < 6; i++){
            // checks to see if the bug is in the kill zone for each column. Because
            // a bug can be in the kill zone of more than one column at a time I chose this way
            // to detect.  
            if (this.x<collisionValues[i][1]&this.x>collisionValues[i][0]){
                this.column = i;
                // if the current column being check is the same colum as the player,
                // the player's location gets reset
                if (this.column === player.column){
                    player.row = 1;
                    player.column = 3;
                }
            }
        }
    }
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Basic move function for the enemies. When an enemy object is created
    // it's speed value is set. This takes the current location, plus the speed
    // value, multiplied by dt
    this.x = (this.x + this.speed * dt);
    if (this.x > 500){
        this.x = -200;
    }

    //collision detection takes place at this point.
    this.collision();
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    // sets the starting position and graphic of the player.
    this.sprite = 'images/char-boy.png'
    this.column = 3;
    this.row = 1;
};


Player.prototype.update = function(dt) {
    //when the player hits the water, they win and go back to the beginning. They've won!
    if (this.row > 5){
        this.row = 1;
    }

    //keeps the player in the zone
    if (this.row < 1){
        this.row = 1;
    }
    if (this.column < 1){
        this.column = 1;
    }
    if (this.column > 5){
        this.column = 5;
    }
};

Player.prototype.render = function() {
    //because there is just a single player object, I'm doing the lookup on his
    //location based on the column and row values each frame.
    ctx.drawImage(Resources.get(this.sprite), playerPosition["column"][this.column], playerPosition["row"][this.row]);
};

Player.prototype.handleInput = function(button) {
    // checks the key inputs and appropriately moves the player that direction
    // checks to keep him in the zone and win are in the update function.
    if (button === 'left') {
        this.column = this.column - 1;
    }
    if (button === 'up') {
        this.row = this.row + 1;
    }
    if (button === 'right') {
        this.column = this.column + 1;
    }
    if (button === 'down') {
        this.row = this.row - 1;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creates the player. Because there arent any options on creating him,
// there are no values passed into the constructor.
var player = new Player();

// enemy creation. Their initial position, row and speed are set 
// here for the constructor.
var enemy1 = new Enemy(-103, 3, 100);
var enemy2 = new Enemy(-150, 4, 170);
var enemy3 = new Enemy(-222, 5, 230);
var enemy4 = new Enemy(-270, 5, 110);

//array holding all the enemies.
var allEnemies = [enemy1, enemy2, enemy3, enemy4];



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
