//This draws the map
var defaultX = 0;
var defaultY = 0;

var mapW = 15;
var mapH = 10;

var type = 0;
var map = [];
var originMap = [];
var wallneighbors = [];
	
	
function drawMap(state){
	map = [];
	map = JSON.parse(JSON.stringify(state));
	originMap = state;
	for(var i =0; i<map.length; i++){
		for(var j =0; j<map[i].length; j++){
			
			if(map[i][j] > 0){
				type = map[i][j]-1;
				wallneighbors = [0,0,0,0];
				var neighbors = findNeighbors(i,j);
				switch(wallneighbors.toString().replace(/,/g, '')){
					case "0000":
						map[i][j] = 24;
						break; 
					case "1000":
						map[i][j] = 15;
						break;
					case "0100":
						map[i][j] = 13;
						break;					
					case "0010":
						map[i][j] = 5;
						break;					
					case "0001":
						map[i][j] = 3;
						break;
					case "1100":
						map[i][j] = 14;
						break;					
					case "0011":
						map[i][j] = 4;
						break;
					case "1001":
						map[i][j] = 2;
						break;					
					case "0110":
						map[i][j] = 20;
						break;
					case "1010":
						map[i][j] = 22;
						break;					
					case "0101":
						map[i][j] = 23;
						break;
					case "1110":
						map[i][j] = 21;
						break;					
					case "1101":
						map[i][j] = 1;
						break;	
					case "1011":
						map[i][j] = 12;
						break;	
					case "0111":
						map[i][j] = 10;
						break;						
									
					default:
						map[i][j] = 11;
						
				} 
				
				//The number assigned to each tile represents the x and y location on the tile sheet.
					//For Example 24 is in the 3rd row 5th column, because we start at point 0.
					//The first row is only 1 number long (1,2,3,4,5) because the row is 0.
				var tnum = map[i][j];
				var tstring = tnum.toString();
				//If the number is only 1 long, it is in the first row, so the Y coordinate is 0.
				if(tstring.length < 2){
					defaultY = 0;
					defaultX = tnum*40;
				//If the tile is not in the first row, we get the XY coordinates by 
				//substringing the number and multiplying it by 40.
				}else{
					defaultY = parseInt(tstring.substring(0,1))*40;
					defaultX = parseInt(tstring.substring(1,2))*40;
				}
				
				defaultY = defaultY + (type * 120);
				
				walls.push(new obstacle(defaultX,defaultY,j*40, i*40, "img/obstacles.png"));
			}
		}
	}
}

function findNeighbors(x,y){
	//Finds cells above, below, left, and right of target cell
	// 0 - Above
	// 1 - below
	// 2 - left
	// 3 - right
	var next = [
			[x, y-1],
			[x, y+1],
			[x-1, y],
			[x+1, y]
		]; 
		
	var pass = [];
		
	for(var i = 0; i < next.length; i++){
		//This only includes blocks that are not on the a border
		
		if(next[i][0] >= 0 
		&& next[i][1] >= 0 
		&& next[i][0] < mapH 
		&& next[i][1] < mapW
		&& originMap[next[i][0]][next[i][1]] === originMap[x][y]
		){
			//If that map is a wall block int the generated map, the value in the 4 digit neighbor array turns to 1.
			if(map[next[i][0]][next[i][1]] > 0){
				wallneighbors[i] = 1;
			}
			//Only pass if wall piece
			pass.push(next[i]);
		}
		
	}
	//Returns array of neighbors.
	return pass;
}