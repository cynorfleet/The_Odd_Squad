var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function () {};

TopDownGame.Game.prototype = {
    create: function () {
        this.map = this.game.add.tilemap('level1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');

        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        //make the maze
        this.maze(this.map.width, this.map.height);

        this.createItems();
        this.createDoors();
        this.map.putTile(222, 6, -1, 1);
        //this.map.putTile(220, 4, 17, 0);;
        //this.map.removeTile(4, 17, 1);

        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },

    function maze(x, y) {
        var n = x * y - 1;
        if (n < 0) {
            alert("illegal maze dimensions");
            return;
        }
        var horiz = [];
        for (var j = 0; j < x + 1; j++) horiz[j] = [],
            verti = [];
        for (var j = 0; j < x + 1; j++) verti[j] = [],
            here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)],
            path = [here],
            unvisited = [];
        for (var j = 0; j < x + 2; j++) {
            unvisited[j] = [];
            for (var k = 0; k < y + 1; k++)
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }
        while (0 < n) {
            var potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
		    [here[0] - 1, here[1]], [here[0], here[1] - 1]];
            var neighbors = [];
            for (var j = 0; j < 4; j++)
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                    neighbors.push(potential[j]);
            if (neighbors.length) {
                n = n - 1;
                next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0])
                    horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
                else
                    verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
                path.push(here = next);
            } else
                here = path.pop();
        }
        return {
            x: x,
            y: y,
            horiz: horiz,
            verti: verti
        };
    },




    createItems: function () {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        result = this.findObjectsByType('item', this.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    createDoors: function () {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        result = this.findObjectsByType('door', this.map, 'objectsLayer');

        result.forEach(function (element) {
            this.createFromTiledObject(element, this.doors);
        }, this);
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    },
    update: function () {
        //collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        //player movement

        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= 50;
        } else if (this.cursors.down.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y += 50;
        } else {
            this.player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
        }
    },
    collect: function (player, collectable) {
        console.log('yummy!');

        //remove sprite
        collectable.destroy();
    },
    enterDoor: function (player, door) {
        console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
    },
};
