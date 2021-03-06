/* These Key/Value pairs hold the script. Eventually I want to move these
to plain text files where the key is the files name. This will be eaier to 
update and translate.

comments: line starts with #
Buttons: {ButtonText}
Labels: -LabelName (Must be on own line.)
Variables: [VariableName]  Right now, the variable name must match a player.variableName

GOTO-LabelName: Goes to LabelName after button has been clicked.
CALL-function: calls function from ../js/diaCallback.js **IN PROGRESS**
Random lines must be seperated with labels -rdmX. 

*/
var diaNPC = {
	"towna": "You look like fresh meat.\nAnd I mean meat.\nThese zombies will eat you alive.\nGood Luck... if it matters.",
	"townb": "The Zombie scourge started 15 years ago.\nNobody knows where they came from.\nYou're very brave for going out there.",
	"townc": "You can't go out empty handed.\nBuy Something?\n{Yes.} CALL-openShop(0)\n{No thanks.} GOTO-bad\nThanks\n-bad\nToo bad.",
	"foresta": "First the king sent his knights.\nBut they didn't come back.\nThen he sent volunteers.\nThey didn't come back either.\nNow he's scraping the bottom of the barrel.\nYou must not have much to live for.",
	"forestb": "Congratulations on making it this far.\nThey say the zombies are ruled by a queen.\nI wonder why the they only come out at winter?",
	"forestc": "Welcome to the forest outpost.\nBuy Something?\n{Yes.} CALL-openShop(1)\n{No thanks.} GOTO-bad\nThanks\n-bad\nToo bad.",
	"wastea": "The zombies come out every year at this time.\nNobody knows what they want.\nDo they want anything at all?\nOr are they just here to kill?\nMay God have mercy on us.",
	"wasteb": "...\nIt's too cold here.\nNot many of you make it this far.\nI probably won't see you again,.",
	"wastec": "Well? Buy Something?\n{Yes.} CALL-openShop(2)\n{No thanks.} GOTO-bad\nThanks\n-bad\nToo bad.",
	
};
 var diaObjects = {
	/*"door": "It's locked\nCALS-checkKey('Key')\n-notHave\nIt's still locked\n-doesHave\nYou unlocked the door\nCALL-addGold(10)",
	"chest": "\nThis is multiple lines\n#I hope everyone is Well!\nYAY!\n-next",
	"testGoto": "\nHi. Let's skip the small talk.\nGOTO-end\nI hope everyone is Well!\nYAY!\n-end\nSee isn't that easy?\n-more",
	"random": "-rdm0\nHi How are you?\n-rdm1\nToday is a beautiful day!\nIsn't it?\n-rdm2\nThe birds are singing and the sun is shining.\n-rdm3\nREDRUMREDRUMREDRUM!!!!",
	"repeat": "Let me tell you a story!\nIt's a really good one!!\neh... I forgot.",
	"question":"I have a question.\n\nHow are you today?\n{Good.} GOTO-Good\n{Not good.} GOTO-bad\n-Good\nI am glad to hear!\n-bad\nThat is unfortunate.",
	"testInput":"Hello [name], my friend.\nI heard you like [food]!",
	"gameOver":"Would you like to test Game Over Function?\n{Yes.} CALL-testEndGame()\n{No thanks.} GOTO-bad\n\n\n-bad\nThat is unfortunate.",
	"openShop":"Would you like to buy something?\n{Yes.} CALL-openShop()\n{No thanks.} GOTO-bad\nThanks\n-bad\nThat is unfortunate.",
	"testKey": "Hello! Can you find me a McGuffin?\nCALS-checkKey('McGuffin')\n-notHave\nI sure could use a McGuffin!\n-doesHave\nOh thank you! This is exactly what I needed! Here is some Gold!\nCALL-addGold(10)\nThanks again.\nCALL-endKey()\n-end\nThank you so much for finding that McGuffin!",
	"testAudio": "Hello, let's make some noise!\nCALL-playAudio('Coin.wav')\nThanks!",
	"testMove": "Hello, what do you want me to do?\n{Follow Me} CALL-changeMove(2)\n{Go Away!} CALL-changeMove(3)\n{Whatever you want.} CALL-changeMove(1)\n{Stop} CALL-changeMove(0)\n#Comment!\nok!",
	"testLabelCall": "Hello, pick a card!\n{Heart} GOTO-Heart\n{Club} GOTO-Club\n{Spade} GOTO-Spade\n{Diamond} GOTO-Diamond\n-Heart\nCALL-changeMove(2)\nI love you!\n-Club\nCALL-playAudio('Coin.wav')\nThanks!\n-Spade\nYou picked Spade\n-Diamond\nIf I was a rich bot! NAH NAH NAH",
	"iterated": "-dia1\nHola!\n-dia2\nThis is the second line.\n-dia3\nThis is the third Line.\n-dia4\nThat's all I got."*/
}; 

var diaEvent = {
	"test": "Hi\nI am a static event.\nDid I work?",
	"door": "It's locked\nCALS-checkKey('McGuffin')\n-notHave\nI sure could use a McGuffin!\n-doesHave\nOh thank you! This is exactly what I needed! Here is some Gold!\nCALL-addGold(10)\nThanks again.\nCALL-endKey()\n-end\nThank you so much for finding that McGuffin!",
};