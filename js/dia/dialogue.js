var waiting = false;
var isButton = false;
var displayDialogue = true;

var buttons = [];
var buttonIndex = 0;
var buttonBuff = false;

function dialogue(thisChar){
	
	distX = (player.x + (player.w/2)) - (thisChar.x + (thisChar.w/2));
	distY = (player.y + (player.h/2)) - (thisChar.y + (thisChar.h/2));
	
	/* *** TYPES *** 
	0 - No Type
	1 - Random
	2 - Repeat Last
	3 - Iterated
	*/
	
	var range = 45;
	
	//Checks if this character is within range of player and if SPACE bar has been pressed and is up.
	if(distX <= range 
	&& distX >= -range
	&& distY <= range 
	&& distY >= -range
	&& !thisChar.diaEnd
	){
		thisChar.dirX = 0;
		thisChar.dirY = 0;
		
		
		/* ******** ****
		If distY is negative, face up
		If distY is positive, face down

		If distX is negative, face left
		If distX is positive, face right

		If x and y is the same or inversed, you are on the X
		So, we need to evaluate the differences between X and Y to determine 
		which quandrant you belong in.

		00 is the NPC

		--   0-   +-
		-0   00   +0
		-+   0+   ++
		******** **** */
		
		var wDiff = (player.w/2) + (thisChar.w/2);
		var hDiff = (player.h/2) + (thisChar.h/2);
		
		//NPC is facing left
		if(distX < (wDiff*-1)){
			thisChar.frameY = (thisChar.h);
		//NPC is facing right
		}else if(distX > wDiff){
			thisChar.frameY = (thisChar.h * 2);
		}
		//NPC is facing up
		if(distY < (hDiff*-1)){
			thisChar.frameY = (thisChar.h * 3);
		//NPC is facing down
		}else if(distY > hDiff){
			thisChar.frameY = 0;
		}
		
		
		//If true, then we advance the dialogue.
		advanceDia(thisChar);
	}
	
	//If the space bar is pressed and the dialogue is complete, we clean up the screen 
	//and reset variables.
	if(player.inDialogue
	&& thisChar.inDialogue
	&& thisChar.diaEnd
	){
		endDialogue(thisChar);
	}
	
}

function advanceDia(thisChar){
	diaLine2 = "";
	if(!waiting){
		thisChar.inDialogue = true;
		player.inDialogue = true;
		
		if(thisChar.type == "chest" && !thisChar.opened){
			if(thisChar.prizeType == 0){
				addGold(thisChar.prizeValue);
			}else{
				addItem(thisChar.prizeValue);
			}
			thisChar.opened = true;
		}
		
		if(thisChar.type == "door"){
			thisChar.checkLock();
		}
		
		//If random, gets a random line in the dialogue.
		if(thisChar.diaType == 1){
			var max = getMaxLabels(thisChar, "rdm");
			var rdmInt = Math.floor(Math.random() * (max));
			thisChar.label = "rdm"+rdmInt;
		}
		//If set to iterate and no label has been declared, set the label.
		if(thisChar.diaType == 3 && thisChar.label == ""){
			thisChar.label = "dia1";
		}
		
		//If label is assigned, it finds the line with that label.
		if(thisChar.label.length > 1 && !thisChar.labelMet){
			thisChar.diaCounter = goToLabel(thisChar);
		}
		
		//Gets the current counter. This tells the program what line to pull up.
		//Note, label and random are calculated first to adjust the current counter.
		var thisCounter = thisChar.diaCounter
		
		if(thisCounter < thisChar.dialogue.length){
			//grabs the next line.
			//Note: we check if there is a line available first, otherwise it will error out.
			var thisLine = thisChar.dialogue[thisCounter];
			//Now that we have our line, let's just go ahead and advance the counter.
			thisChar.diaCounter++;
			
			//Check if you're in a button group, and the next line is not a button, we wait for user input.
			if(isButton && thisLine.substring(0,1) != "{"){
				waiting = true;
			}else{
			
			
				//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
				
				
				//First check: is it a comment (#) or blank line. If yes, skip this line and restart.
				if(thisLine.substring(0,1) == "#"
				|| thisLine.length < 1){
					advanceDia(thisChar);
					return;
				}
				//Next: does this line call a function? If it does, call that function then restart.
				if(thisLine.substring(0,4) == "CALL"){
					var tempStart = thisLine.indexOf("CALL") + 5;
					var output = thisLine.substring(tempStart, thisLine.length);
					getCallBack(output,thisChar.index);
					return;
				}
				if(thisLine.substring(0,4) == "CALS"){
					var tempStart = thisLine.indexOf("CALS") + 5;
					var output = thisLine.substring(tempStart, thisLine.length);
					getCallBackStop(output,thisChar.index);
					return;
				}
				//Next: does this line change a label? If it does, change the then restart.
				if(thisLine.substring(0,4) == "GOTO"){
					var tempStart = thisLine.indexOf("GOTO") + 5;
					var output = thisLine.substring(tempStart, thisLine.length);
					changeLabel(output,thisChar.index);
					return;
				}
				//Next: Is this line a label? If it is, we're not supposed to go any farther so we end the dialogue here.
				if(thisLine.substring(0,1) == "-"){
					//If this is a button we want to wait for user input before closing the dialog boxes.
					if(!isButton){
						//@@@@@@@
						endDialogue(thisChar);
						return;
					}
					//If it is a button and we reached a label. I want to stop everything until a button has been clicked. 
					else{
						//Test failed on calling function from button. Need to kick back dialogue counter to pick up label outside of button loop.
						thisChar.diaCounter--;
						waiting = true;
						return;
					}
				}
				//Next: Is this line a button? *** This is where things are going to get a little tricky.
				if(thisLine.substring(0,1) == "{"){
					createBtn(thisChar, thisLine);
				}
				//Next Is there a variable on this line that needs to be replaced?
				if (thisLine.indexOf("[") >= 0){
					//Slicing and Dicing!
					var tempStart = thisLine.indexOf("[")+1;
					var tempEnd = thisLine.indexOf("]");
					var output = thisLine.substring(tempStart, tempEnd);
					//Replace words on line
					//NOTE: There MUST be an existing variable with the same name os the word.
					thisLine = thisLine.replace("["+output+"]", eval("player."+output));
				}
				//If we've gotten this far, we'll write the line to the box, and show it.
				//If this line is a button, I want to construct the button without displaying code. So we're only going to show this line if it's not flagged as a button.
				if(!isButton){
					diaLine = thisLine
				}
			//Remember when we checked if there is another available line? If there isn't, we end the dialogue. (There's nothing left to talk about!!)
				
				
			//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
				
			}
			
		}else{
			endDialogue(thisChar);
		}
		
		//If dialogue type is to iterate, we advance the dialogue label here.
		if(thisChar.diaType == 3 && thisChar.label != ""){
			var max = getMaxLabels(thisChar, "dia");
			var i = thisChar.label.substring(3,4);
			if(i > max){
				//i = 0;
				i = max -1;
			}
			thisChar.label = "dia"+(parseInt(i)+1);
		}
	}
}

function endDialogue(thisChar){
	player.inDialogue = false;
	thisChar.inDialogue = false;
	//Unless the dialogue is instructed to repeat the last line (2)
	//dialogue conter is reset.
	if(thisChar.diaType != 2){
		thisChar.diaCounter = 0;
	}
	//Repeat goes back by one to keep dialogue on last line.
	else{
		thisChar.diaCounter--;
	}
	thisChar.diaEnd = false;
	if(thisChar.flushLabel){
		thisChar.label = "";
	}
	thisChar.labelMet = false;
	
	//If the dialogue is initiated by a chest, we add the prize and change
	//Chest dialogue to tell the player it;s now empty.
	if(thisChar.type == "chest"){
		thisChar.changeDialogue();
	}
	if(thisChar.type == "door" && thisChar.opened){
		doors.splice(doors.indexOf(thisChar), 1);
	}
}

//This counts how many random labels are on a random dialogue.
function getMaxLabels(thisChar, label){
	var counter = 0;
	for (var i = 0; i < thisChar.dialogue.length; i++){
		if(thisChar.dialogue[i].substr(0,4) == "-"+label){
			counter++;
		}
	}
	return counter;
}

//Changes the counter to find the line with the coresponding label.
function goToLabel(thisChar){
	var counter = 0;
	for (var i = 0; i < thisChar.dialogue.length; i++){
		if(thisChar.dialogue[i] == "-"+thisChar.label){
			counter = i+1;
			thisChar.labelMet = true;
		}
	}
	return counter;
}

//Creates buttons if user input is requested.
function createBtn(thisChar, thisLine){
	//This gets hairy. I reset the currentshop index for EVERY button creation.
	//If there is a shop, it will change the index. If there isn't, it will reset it to 0
	isButton = true;
	//currShopIndex = thisChar.shopIndex;
	var btnLabel = thisLine.substr(1,thisLine.indexOf("}")-1);
	var type = 0;
	var output = "";
	if (thisLine.indexOf("GOTO") >= 0){
		var tempStart = thisLine.indexOf("GOTO") + 5;
		output = thisLine.substring(tempStart, thisLine.length);
	}
	//If we want to add a value to send to the callback, we will have to make changes here.
	if (thisLine.indexOf("CALL") >= 0){
		type = 1;
		var tempStart = thisLine.indexOf("CALL") + 5;
		output = thisLine.substring(tempStart, thisLine.length);
	}
	
	buttons.push([btnLabel,type,output,thisChar.index]);
	
	advanceDia(thisChar);
}
//Changes label when input button is pressed.
function changeLabel(newLabel, index){
	waiting = false;
	isButton = false;
	displayDialogue = true;
	buttons=[];
	//change label
	//Advance Dialogue
	npcs[index].label = newLabel;
	advanceDia(npcs[index]);
}

//Replaces word with variable when used in dialogue.
function replaceWord(word, thisChar){
	thisChar.dialogue[thisChar.diaCounter]=thisChar.dialogue[thisChar.diaCounter].replace("["+word+"]", eval("player."+word));
}
//Calls function from diaCallback.js
function getCallBack(output, index){
	tempChar = index;
	eval(output);
	if(isButton){
		npcs[index].diaCounter--;
	}
	waiting = false;
	isButton = false;
	displayDialogue = true;
	buttons=[];
	advanceDia(npcs[index]);
}
function getCallBackStop(output, index){
	tempChar = index;
	eval(output);
	if(isButton){
		npcs[index].diaCounter--;
	}
	waiting = false;
	isButton = false;
	displayDialogue = true;
	$("#btnBox").hide();
	endDialogue(npcs[index]);
}

function btnControl(key){
	if (key == 37 || key == 65) {}
	if (key == 39 || key == 68) {}
	if (key == 38 || key == 87) {
		if(buttonIndex > 0){
			buttonIndex--;
		}
	}
	if (key == 40 || key == 83) {
		if(buttonIndex < buttons.length-1){
			buttonIndex++;
		}
	}
	if(key == 32 || key == 69){
		if(!buttonBuff){
			buttonBuff = true
		}else{
			if(buttons[buttonIndex][1] == 0){
				//conosle.log("Label");
				changeLabel(buttons[buttonIndex][2], buttons[buttonIndex][3]);
			}else{
				//console.log("Callback");
				getCallBack(buttons[buttonIndex][2], buttons[buttonIndex][3]);
			}
			buttonBuff = false;
		}
	}
}