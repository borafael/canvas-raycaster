var RAYCASTER = {};

function init() {
	RAYCASTER.miniMap = document.getElementById('miniMap');
	RAYCASTER.viewPort = document.getElementById('viewPort');
	RAYCASTER.pos = new Vector(RAYCASTER.miniMap.width / 2, RAYCASTER.miniMap.height / 2);
	RAYCASTER.angle = 3 * Math.PI / 2;

	RAYCASTER.rightPressed = false;
	RAYCASTER.leftPressed = false;
	RAYCASTER.upPressed = false;
	RAYCASTER.downPressed = false;

	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);

	loop();
}


function loop() {
	update();
	render();

	setTimeout(function(){ loop(); }, 0.1);
}

function update() {

	if (RAYCASTER.rightPressed) {
		RAYCASTER.angle = RAYCASTER.angle + Math.PI / 100;
	}

	if (RAYCASTER.leftPressed) {
		RAYCASTER.angle = RAYCASTER.angle - Math.PI / 100;
	}

	if (RAYCASTER.upPressed) {
		RAYCASTER.pos = RAYCASTER.pos.add(new Vector(0.5 * Math.cos(RAYCASTER.angle), 0.5 * Math.sin(RAYCASTER.angle)));
	}

	if (RAYCASTER.downPressed) {
		RAYCASTER.pos = RAYCASTER.pos.sub(new Vector(0.5 * Math.cos(RAYCASTER.angle), 0.5 * Math.sin(RAYCASTER.angle)));
	}
}

function render() {
	drawMiniMap();
	renderViewPort();
}

function drawMiniMap() {
	var miniMap = RAYCASTER.miniMap;
	var pos = RAYCASTER.pos;
	var angle = RAYCASTER.angle;
	var width = miniMap.width;
	var height = miniMap.height;
	var ctx = miniMap.getContext('2d');

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

	for (var i = 0; i < 250; i = i + 10) {
        	ctx.strokeStyle = "#000000";

		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, 250);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(250, i);
		ctx.stroke();
	}

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(pos.x, pos.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();

	var aim = new Vector(10 * Math.cos(angle), 10 * Math.sin(angle));

	ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.add(aim).x, pos.add(aim).y);
	ctx.stroke();
}

function renderViewPort() {
	
}

function keyDownHandler(event) {
	if (event.keyCode == 39) {
		RAYCASTER.rightPressed = true;
	} 

	if (event.keyCode == 37) {
		RAYCASTER.leftPressed = true;
	}

	if (event.keyCode == 40) {
		RAYCASTER.downPressed = true;
	}

	if (event.keyCode == 38) {
		RAYCASTER.upPressed = true;
	}
}

function keyUpHandler(event) {
	if(event.keyCode == 39) {
        	RAYCASTER.rightPressed = false;
    	}

	if(event.keyCode == 37) {
        	RAYCASTER.leftPressed = false;
    	}

    	if(event.keyCode == 40) {
    		RAYCASTER.downPressed = false;
    	}

    	if(event.keyCode == 38) {
    		RAYCASTER.upPressed = false;
    	}
}

function Vector(x, y) {
        this.x = x;
        this.y = y;
        this.add = function add(vector) {
                return new Vector(this.x + vector.x, this.y + vector.y);
        };
        this.sub = function sub(vector) {
                return new Vector(this.x - vector.x, this.y - vector.y);
        };
        this.mul = function sub(num) {
                return new Vector(this.x * num, this.y * num);
        };
        this.dot = function sub(vector) {
                return this.x * vector.x + this.y * vector.y;
        };
        this.abs = function abs() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.normal = function normal() {
                return new Vector(1, -(this.x / this.y));
        }
}
