function draw(x,y,boardSize){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d"); //establish a 2D context
	var arrowcanvas = document.getElementById("arrowCanvas");
	var arrowctx= arrowcanvas.getContext("2d"); //establish a 2D context
	//ctx.save(); //save the canvas state

	var width = 400.0 / boardSize; //rounding errors?
	var height = 400.0 / boardSize;
	arrowctx.clearRect(0,0,400,400);
	ctx.clearRect(0,0,400,400);
	//console.log(boardSize);
	for(var row = 0; row < boardSize; row++){
		for(var column = 0; column < boardSize; column++){
			if(( row % 2 == 0 && column %2 == 0) || (row %2 == 1 && column % 2 == 1)){
				ctx.fillStyle = "white";  //alternating white squares
			}else{
				ctx.fillStyle = "gray";  
			}
			
			ctx.fillRect(row*width,column*height,width,height); //draw rectangles of this size		
		}


	}

}


function drawPolygon(ctx,arrow,color){
	//draw a polygon

	ctx.beginPath();
	ctx.moveTo(arrow[0][0],arrow[0][1]);

	for(point in arrow){
		if(point > 0){
			ctx.lineTo(arrow[point][0],arrow[point][1]);

		}
	}
	ctx.lineTo(arrow[0][0],arrow[0][1]);
	ctx.fillStyle = color;
	ctx.fill();

};

function translateShape(shape,x,y){
	//translate the shape
	var rot = [];
	for(point in shape){
		rot.push([shape[point][0] +x, shape[point][1]+ y]);
	}
	return rot;
};

function rotateShape(shape,angle){
	//rotate the shape
	var rv =[];
	for(point in shape){
		rv.push(rotatePoint(angle,shape[point][0],shape[point][1]));

	}
	return rv;
}
function rotatePoint(angle,x,y){
	//rotate the point (arrowhead)
	return[
		(x * Math.cos(angle)) - (y*Math.sin(angle)),
		(x*Math.sin(angle)) + (y * Math.cos(angle))

	];
};

function drawArrow(ctx,x1,y1,x2,y2,color){
	//draw the actual arrow, given start and end coordinates + context

	var arrow = [
    [ 2, 0 ],
    [ -10, -4 ],
    [ -10, 4]
	];

	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.strokeStyle=color;
	ctx.stroke();
	var ang = Math.atan2(y2-y1,x2-x1);
	drawPolygon(ctx,translateShape(rotateShape(arrow,ang),x2,y2),color);
};


