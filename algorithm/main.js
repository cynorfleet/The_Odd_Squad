
var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('maze', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/maze.png');	
    game.load.spritesheet('mage', 'assets/mageSprite.png', 20, 23);
}

var speed = 3;
var groove = 0;
var player;

function create() {


    map = game.add.tilemap('maze');

    tiles.addTilesetImage('maze', 28, 28, 0, 2, 1);
    
    layer = game.add.tilemapLayer(0, 0, 1000, 600, tileset, map, 0);
	player = game.add.spritesheet(game.width/2, game.height/2, 'mage');
	player.anchor.setTo(0.5, 0.5);
	player.body.immovable = true;
    cursors = game.input.keyboard.createCursorKeys();
	maze(1,2,1,1);
}



function update() {

	movePlayer(player);

  //  Run collision
  //game.physics.collide(player, candies, hitCandy, null, this);
  //game.physics.collide(player, baddies, hitBaddie, null, this);
	
		
	
}

function getPower (player, candy) {
}

function hitBaddie (player, cat) {
}

function moveBaddie(cat) {
}

function movePlayer(chick) {


}

function maze(x,y, prevX, prevY) {
	currentTile = map.getTile(x,y);
	console.log(currentTile.x);
	console.log(currentTile.y);

	var north = map.getTile(x,y-1);
	var south = map.getTile(x,y+1);
	var east = map.getTile(x+1,y);
	var west = map.getTile(x-1,y);
	
	var walk = game.rnd.integerInRange(1,4);
	if(north.index == 8 ||	east.index == 8 || south.index == 8 || west.index == 8){
		//going up
		if(north.index == 8 && walk == 1){
			//from below
			if(prevY == y+1){
				currentTile.index = 3;
				currentTile.collideLeft = true;
				curretnTile.collideRight = true;
			}
			//from the left
			if(prevX == x-1){
				currentTile.index = 4;
				currentTile.collideDown = true;
				curretnTile.collideRight = true;
			}
			//from the right
			if(prevX == x+1){
				currentTile.index = 5;
				currentTile.collideDown = true;
				curretnTile.collideLeft = true;
			}
			maze(x, y-1, x, y);
		}
		if(south.index == 8 && walk == 2){
			//from above
			if(prevY == y-1){
				currentTile.index = 3;
				currentTile.collideLeft = true;
				curretnTile.collideRight = true;
			}
			//from the left
			if(prevX == x-1){
				currentTile.index = 7;
				currentTile.collideUp = true;
				curretnTile.collideRight = true;
			}
			//from the right
			if(prevX == x+1){
				currentTile.index = 6;
				currentTile.collideUp = true;
				curretnTile.collideLeft = true;
			}
			maze(x, y+1, x, y);
		}
		if(east.index == 8 && walk == 3){
			//from above
			if(prevY == y-1){
				currentTile.index = 5;
				currentTile.collideLeft = true;
				curretnTile.collideDown = true;
			}
			//from below
			if(prevY == y+1){
				currentTile.index = 6;
				currentTile.collideUp = true;
				curretnTile.collideLeft = true;
			}
			//from the left
			if(prevX == x-1){
				currentTile.index = 2;
				currentTile.collideUp = true;
				curretnTile.collideDown = true;
			}
			maze(x+1, y, x, y);
		}
		if(west.index == 8 && walk == 4){
			//from above
			if(prevY == y-1){
				currentTile.index = 4;
				currentTile.collideRight = true;
				curretnTile.collideDown = true;
			}
			//from below
			if(prevY == y+1){
				currentTile.index = 7;
				currentTile.collideUp = true;
				curretnTile.collideRight = true;
			}
			//from the right
			if(prevX == x+1){
				currentTile.index = 2;
				currentTile.collideUp = true;
				curretnTile.collideDown = true;
			}
			maze(x-1, y, x, y);
		}
		//if we can't move in the random direction
		//going up
		if(north.index == 8){
			//from below
			if(prevY == y+1){
				currentTile.index = 3;
				currentTile.collideLeft = true;
				curretnTile.collideRight = true;
			}
			//from the left
			if(prevX == x-1){
				currentTile.index = 4;
				currentTile.collideDown = true;
				curretnTile.collideRight = true;
			}
			//from the right
			if(prevX == x+1){
				currentTile.index = 5;
				currentTile.collideDown = true;
				curretnTile.collideLeft = true;
			}
			maze(x, y-1, x, y);
		}
		//going down
		if(south.index == 8){
			//from above
			if(prevY == y-1){
				currentTile.index = 3;
				currentTile.collideLeft = true;
				curretnTile.collideRight = true;
			}
			//from the left
			if(prevX == x-1){
				currentTile.index = 7;
				currentTile.collideUp = true;
				curretnTile.collideRight = true;
			}
			//from the right
			if(prevX == x+1){
				currentTile.index = 6;
				currentTile.collideUp = true;
				curretnTile.collideLeft = true;
			}
			maze(x, y+1, x, y);
		}
		if(east.index == 8){
			//from above
			if(prevY == y-1){
				currentTile.index = 5;
				currentTile.collideLeft = true;
				curretnTile.collideDown = true;
			}
			//from below
			if(prevY == y+1){
				currentTile.index = 6;
				currentTile.collideUp = true;
				curretnTile.collideLeft = true;
			}
			//from the left
			if(prevX == x-1){
				currentTile.index = 2;
				currentTile.collideUp = true;
				curretnTile.collideDown = true;
			}
			maze(x+1, y, x, y);
		}
		if(west.index == 8){
			//from above
			if(prevY == y-1){
				currentTile.index = 4;
				currentTile.collideRight = true;
				curretnTile.collideDown = true;
			}
			//from below
			if(prevY == y+1){
				currentTile.index = 7;
				currentTile.collideUp = true;
				curretnTile.collideRight = true;
			}
			//from the right
			if(prevX == x+1){
				currentTile.index = 2;
				currentTile.collideUp = true;
				curretnTile.collideDown = true;
			}
			maze(x-1, y, x, y);
		}
	}
	else{
		return;
	}

}
 
function display(m) {
	
	// debug stuff ------
	myString1 = m.x.toString();
	myString2 = m.y.toString();

	myString3 = m.horiz.length.toString();
	myString4 = m.verti.length.toString();

	console.log("horiz:");
	for (i=0; i<m.horiz.length; i++)
		{console.log(m.horiz[i])}

	console.log("verti:");
	for (i=0; i<m.verti.length; i++)
		{console.log(m.verti[i])}
	// -------------------


}

function render() {

	game.debug.renderText('# cellsX: ' + myString1, 630, 48, 'rgb(255,0,0)');
	game.debug.renderText('# cellsY: ' + myString2, 630, 80, 'rgb(255,0,0)');

	game.debug.renderText('Change dimensions', 620, 212, 'rgb(0,255,0)');
	game.debug.renderText('at line 22:', 620, 226, 'rgb(0,255,0)');
	game.debug.renderText('display(maze(X,Y))', 620, 240, 'rgb(0,255,0)');

	game.debug.renderText('(reload for new maze)', 220, 14, 'rgb(255,255,255)');

	// game.debug.renderText('currentTile: ' + currentTile, 620, 300, 'rgb(255,0,0)');
	// game.debug.renderText('tileAbove: ' + tileAbove, 620, 332, 'rgb(255,0,0)');
	// game.debug.renderText('tileBelow: ' + tileBelow, 620, 364, 'rgb(255,0,0)');	
	// game.debug.renderText('tileLeft: ' + tileLeft, 620, 396, 'rgb(255,0,0)');	
	// game.debug.renderText('tileRight: ' + tileRight, 620, 428, 'rgb(255,0,0)');	

	game.debug.renderText('(sX-14) % 27: ' + (storedX-14) % 27, 620, 460, 'rgb(255,0,0)');	
	game.debug.renderText('(sY-14) % 27: ' + (storedY-14) % 27, 620, 492, 'rgb(255,0,0)');

}
