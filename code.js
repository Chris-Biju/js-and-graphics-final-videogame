var CANVAS_HEIGHT = 768;
var CANVAS_WIDTH = 1024;
var playerParts = [];
setSize(800, 500);

var bgArray = [];
var playerArray = []

var backButton;
var p1defaultButton;
var p1gentlemanButton;
var p1wizardButton;
var p2defaultButton;
var p2gentlemanButton;
var p2wizardButton;
var p1Costume = ""; 
var p2Costume = "";
var onStartScreen = true;
var onCostumeScreen = false;
var player1 = new Circle(25); 
var player2 = new Circle(25);
var p1;
var p2;
var p3;
var p4;
var p1Costume = null;
var p2Costume = null;
var it;
var player1JumpDistance;
var player2JumpDistance;
var player1Distance;
var player2Distance;
var player2Jumping = false;
var player1Jumping = false;
var player1Direction;
var player2Direction;
var player1Colliding = false;
var player1HeadColliding = false;
var p1OnGround;
var p2OnGround;
var player2Colliding = false;
var player2HeadColliding = false;
var backgroundArray = [];
var costumesArray = [];
var levelArray = [];

var BACK_BUTTON_URL = "https://codehs.com/uploads/be82a0e1dfa7a276b850d056dcb80968";
var LOGO_PNG = "https://codehs.com/uploads/be7fcf36872bea477998cb69e92ebb24";
var PLATFORM_WIDTH = getHeight()/13.3;
var BACKGROUND_CIRCLE_COLOR = "#65bd42";
var PLATFORM_COLOR = "#b0750e";
var PLATFORM_BORDER_WIDTH = 4.5

var GRAVITY = CANVAS_HEIGHT/200;
var JUMP_INCREMENT = CANVAS_HEIGHT/50;
var MAX_JUMP_HEIGHT = CANVAS_HEIGHT/5
var STEP_INCREMENT = CANVAS_WIDTH/160;

var PLAYER_HEIGHT = CANVAS_HEIGHT/8;
var PLAYER_WIDTH = CANVAS_WIDTH/16;
var COSTUME_HEIGHT = PLAYER_HEIGHT * 1.75/3;
var SHIRT_HEIGHT = PLAYER_WIDTH / 1.5;
var BOWTIE_WIDTH = PLAYER_HEIGHT / 10;
var BOW_HEIGHT = Math.sqrt((BOWTIE_WIDTH^2) - ((BOWTIE_WIDTH/2)^2));
var MOON_RADIUS = PLAYER_HEIGHT / 10

var EYE_WIDTH = PLAYER_WIDTH/5;
var EYE_HEIGHT = PLAYER_HEIGHT / 4; 
var EYE_OFFSET = PLAYER_WIDTH / 5;
var EYE_Y_OFFSET = PLAYER_HEIGHT/10;

var PUPIL_WIDTH = EYE_WIDTH * 0.75;
var PUPIL_HEIGHT = EYE_HEIGHT / 2;
var PUPIL_OFFSET = EYE_WIDTH / 10;
var PUPIL_Y_OFFSET = EYE_HEIGHT*0.7;


var BLUE_PLAYER_COLOR = "#3498DB";
var RED_PLAYER_COLOR = "#ed3326";
var PINK_PLAYER_COLOR = "#ff00d4";
var YELLOW_PLAYER_COLOR = "#ffff00";
function start(){
    drawBackground();
    setTimer(startScreen, 20);

}

function startScreen(){
    mouseDownMethod(play);
}

function play(e){
    if(onStartScreen){
        var x = e.getX();
        var y = e.getY();
        if(x > getWidth()/20 && x < getWidth() / 20 + getWidth()/4 && y > getHeight()/3.3 && y < getHeight()/ 3.3 + getHeight()/8){
            del(p1);
            del(p2);
            del(p3);
            del(p4);
            del(backgroundArray);
            stopTimer(startScreen);
            onStartScreen = false;
            playerSetPos(p1, getWidth()/2 + 35, 75);
            playerSetPos(p2, getWidth()/2 - 35, 75);
            playerMove(p1, 200, 0);
            it = "p1";
            setTimer(run, 30);
        } else if(x > getWidth()/20 && x < getWidth() / 20 + getWidth()/4 && y > getHeight()/8 && y < getHeight()/8 + getHeight()/2.1){
            del(p1);
            del(p2);
            del(p3);
            del(p4);
            del(backgroundArray);
            drawCostumesScreen();
            setTimer(costumeScreen, 20);
            stopTimer(startScreen);
        }
    }
}

function costumeScreen(){
    mouseClickMethod(costumeClick);
}
function costumeClick(e){
    var x = e.getX();
    var y = e.getY();
    if(onCostumeScreen){
        if(getElementAt(x, y) == backButton){
            onCostumeScreen = false;
            del(costumesArray);
            drawBackground();
            setTimer(startScreen, 20);
            stopTimer(costumeScreen);
        }
        if((x > getWidth()/4) && (x < getWidth()/4 + getWidth()/5) && (y > getHeight()/1.9) && (y < getHeight()/1.9 + getHeight()/15)){
            p1Costume = "";
            del(p1);
            p1 = drawPlayer("p1", BLUE_PLAYER_COLOR, p1Costume, getWidth()/3.5, getHeight()/4);
        } else if((x > getWidth()/4) && (x < getWidth()/4 + getWidth()/5) && (y > getHeight()/1.5) && (y < getHeight()/1.5 + getHeight()/15)){
            p1Costume = "gentleman";
            del(p1);
            p1 = drawPlayer("p1", BLUE_PLAYER_COLOR, p1Costume, getWidth()/3.5, getHeight()/4);
        } else if((x > getWidth()/4) && (x < getWidth()/4 + getWidth()/5) && (y > getHeight()/1.24) && (y < getHeight()/1.24 + getHeight()/15)){
            p1Costume = "wizard";
            del(p1);
            p1 = drawPlayer("p1", BLUE_PLAYER_COLOR, p1Costume, getWidth()/3.5, getHeight()/4);
        }
        
        if((x > getWidth()/1.5) && (x < getWidth()/1.5 + getWidth()/5) && (y > getHeight()/1.9) && (y < getHeight()/1.9 + getHeight()/15)){
            p2Costume = "";
            del(p2);
            p2 = drawPlayer("p2", RED_PLAYER_COLOR, p2Costume, getWidth()/1.39, getHeight()/4);
        } else if((x > getWidth()/1.5) && (x < getWidth()/1.5 + getWidth()/5) && (y > getHeight()/1.5) && (y < getHeight()/1.5 + getHeight()/15)){
            p2Costume = "gentleman"
            del(p2);
            p2 = drawPlayer("p2", RED_PLAYER_COLOR, p2Costume, getWidth()/1.39, getHeight()/4);
        } else if((x > getWidth()/1.5) && (x < getWidth()/1.5 + getWidth()/5) && (y > getHeight()/1.24) && (y < getHeight()/1.24 + getHeight()/15)){
            p2Costume = "wizard"
            del(p2);
            p2 = drawPlayer("p2", RED_PLAYER_COLOR, p2Costume, getWidth()/1.39, getHeight()/4);
        }
    }
}

function drawCostumesScreen(){
    onCostumeScreen = true;
    backButton = new WebImage(BACK_BUTTON_URL);
    backButton.setPosition(getWidth()/40, getWidth()/40);
    add(backButton);
    
    var chooseText = new Text("Choose Your Character!");
    chooseText.setPosition(getWidth()/2 + getWidth()/40 - chooseText.getWidth()/2, getHeight()/8);
    add(chooseText);
    p1 = drawPlayer("p1", BLUE_PLAYER_COLOR, p1Costume, getWidth()/3.5, getHeight()/4);
    p2 = drawPlayer("p2", RED_PLAYER_COLOR, p2Costume, getWidth()/1.39, getHeight()/4);
    p1defaultButton = drawRectangle(getWidth()/5, getHeight()/15, getWidth()/4.5, getHeight()/1.9, BLUE_PLAYER_COLOR);
    p1defaultButton.setBorder(true);
    p1defaultButton.setBorderWidth(4);
    p1gentlemanButton = drawRectangle(getWidth()/5, getHeight()/15, getWidth()/4.5, getHeight()/1.5, BLUE_PLAYER_COLOR);
    p1gentlemanButton.setBorder(true);
    p1gentlemanButton.setBorderWidth(4);
    p1wizardButton = drawRectangle(getWidth()/5, getHeight()/15, getWidth()/4.5, getHeight()/1.24, BLUE_PLAYER_COLOR);
    p1wizardButton.setBorder(true);
    p1wizardButton.setBorderWidth(4);
    costumesArray.push(p1defaultButton);
    costumesArray.push(p1gentlemanButton);
    costumesArray.push(p1wizardButton);
    
    var defaultText = new Text("Default");
    var gentleman = new Text("Gentleman");
    var wizard = new Text("Wizard");
    defaultText.setPosition(getWidth()/3.75, getHeight()/1.73);
    gentleman.setPosition(getWidth()/4.15, getHeight()/1.39);
    wizard.setPosition(getWidth()/3.7, getHeight()/1.16);
    add(defaultText);
    add(gentleman);
    add(wizard);
    
    costumesArray.push(defaultText);
    costumesArray.push(gentleman);
    costumesArray.push(wizard);
    
    p2defaultButton = drawRectangle(getWidth()/5, getHeight()/15, getWidth()/1.5, getHeight()/1.9, RED_PLAYER_COLOR);
    p2defaultButton.setBorder(true);
    p2defaultButton.setBorderWidth(4);
    p2gentlemanButton = drawRectangle(getWidth()/5, getHeight()/15, getWidth()/1.5, getHeight()/1.5, RED_PLAYER_COLOR);
    p2gentlemanButton.setBorder(true);
    p2gentlemanButton.setBorderWidth(4);
    p2wizardButton = drawRectangle(getWidth()/5, getHeight()/15, getWidth()/1.5, getHeight()/1.24, RED_PLAYER_COLOR);
    p2wizardButton.setBorder(true);
    p2wizardButton.setBorderWidth(4);
    
    costumesArray.push(p2defaultButton);
    costumesArray.push(p2gentlemanButton);
    costumesArray.push(p2wizardButton);
    
    var defaultText = new Text("Default");
    var gentleman = new Text("Gentleman");
    var wizard = new Text("Wizard");
    defaultText.setPosition(getWidth()/1.4, getHeight()/1.73);
    gentleman.setPosition(getWidth()/1.455, getHeight()/1.39);
    wizard.setPosition(getWidth()/1.4, getHeight()/1.16);
    add(defaultText);
    add(gentleman);
    add(wizard);
    
    costumesArray.push(defaultText);
    costumesArray.push(gentleman);
    costumesArray.push(wizard);
}
function run(){
    drawLevel();
    collision(p1);
    collision(p2);
    gravity();
    keyDownMethod(movement);
    keyUpMethod(stopMoving);
    player1Move();
    player2Move();
    warp();
}

function movement(e){
    //player 1
    var key = e.key;
    if(key == "ArrowUp" && !player1Jumping && p1OnGround){
        p1OnGround = false;
        player1JumpDistance = 0;
        player1Jumping = true;
        setTimer(player1Jump, 20);
    }  
    if(key == "ArrowLeft"){
       player1Direction = "left"
    }
    if(key == "ArrowRight"){
        player1Direction = "right"
    }
    
    //player 2
    
    if(key == "w" && !player2Jumping && p2OnGround){
        p2OnGround = false;
        player2JumpDistance = 0;
        player2Jumping = true;
        setTimer(player2Jump, 20);
    }
    if(key == "a"){
        player2Direction = "left"
    }
    if(key == "d"){
        player2Direction = "right";
    }
}

function stopMoving(e){
    var key = e.key;
    if(key == "a"){
        player2Direction = "";
    }
    if(key == "d"){
        player2Direction = "";
    }
    
    if(key == "ArrowLeft"){
        player1Direction = "";
    }
    if(key == "ArrowRight"){
        player1Direction = "";
    }
}

function drawRectangle(width, height, x, y, color){
    var rect = new Rectangle(width, height);
    rect.setPosition(x, y);
    rect.setColor(color);
    add(rect);
    return rect;
}

function drawCircle(radius, x, y, color){
    var circle = new Circle(radius);
    circle.setPosition(x, y);
    circle.setColor(color);
    add(circle);
    return circle;
}

function drawLevel(){
    var ground = drawRectangle(getWidth(), PLATFORM_WIDTH, 0, getHeight() - PLATFORM_WIDTH, PLATFORM_COLOR);
    ground.setBorder(true);
    ground.setBorderWidth(2);
    levelArray.push(ground);
    
    var platform = drawRectangle(getWidth()/4, PLATFORM_WIDTH, getWidth() - getWidth()/4, getHeight() - getHeight()/3, PLATFORM_COLOR);
    platform.setBorder(true);
    platform.setBorderWidth(2);
    levelArray.push(platform);
    
    
}


function drawBackground(){
    //bg
    var bg = drawRectangle(getWidth(), getHeight(), 0, 0, "#7cc747");
    for(var i = 0; i  < 50; i ++){
        var r = Randomizer.nextInt(getWidth()/32, getWidth()/8);
        var x = Randomizer.nextInt(0, getWidth());
        var y = Randomizer.nextInt(0, getHeight());
        var circle = drawCircle(r, x, y, BACKGROUND_CIRCLE_COLOR);
    }
    
    p1 = drawPlayer("p1", BLUE_PLAYER_COLOR, p1Costume, getWidth()/1.3, getHeight()/8);
    p2 = drawPlayer("p2", RED_PLAYER_COLOR, p2Costume, getWidth()/1.3, getHeight()/1.7);
    p3 = drawPlayer("p3", PINK_PLAYER_COLOR, "gentleman", getWidth()/2.5, getHeight()/2.8);
    p4 = drawPlayer("p4", YELLOW_PLAYER_COLOR, "wizard", getWidth()/2, getHeight()/1.3);
    
    //logo
    var logo = new WebImage(LOGO_PNG);
    logo.setSize(getWidth()/3.5, getHeight()/3.5);
    logo.setPosition(getWidth()/25, 0);
    add(logo);
    backgroundArray.push(logo);
    //buttons
    var playButton = drawRectangle(getWidth()/4, getHeight()/8, getWidth()/20, getHeight()/3.3, "#08cc40");
    playButton.setBorder(true)
    playButton.setBorderWidth(5);
    backgroundArray.push(playButton);
    
    var costumesButton = drawRectangle(getWidth()/4, getHeight()/8, getWidth()/20, getHeight()/2.1, "#08cc40");
    costumesButton.setBorder(true)
    costumesButton.setBorderWidth(5);
    backgroundArray.push(costumesButton);
    
    var settingsButton = drawRectangle(getWidth()/4, getHeight()/8, getWidth()/20, getHeight()/1.55, "#08cc40");
    settingsButton.setBorder(true)
    settingsButton.setBorderWidth(5);
    backgroundArray.push(settingsButton);
    
    //text
    
    var play = new Text("Play");
    play.setPosition(getWidth()/7, getHeight()/2.6);
    add(play);
    backgroundArray.push(play);
    
    var costumes = new Text("Costumes");
    costumes.setPosition(getWidth()/10, getHeight()/1.8);
    add(costumes);
    backgroundArray.push(costumes);
    
    var settings = new Text("Settings");
    settings.setPosition(getWidth()/8.8, getHeight()/1.38);
    add(settings);
    backgroundArray.push(settings);
    
    var platform1 = drawRectangle(getWidth()/3.8, PLATFORM_WIDTH, getWidth()/1.38, getHeight()/3.63, PLATFORM_COLOR);
    platform1.setBorder(true);
    platform1.setBorderWidth(PLATFORM_BORDER_WIDTH);
    platform1.rotate(345);
    backgroundArray.push(platform1);
    
    var platform2 = drawRectangle(getWidth()/3.2, PLATFORM_WIDTH, getWidth() / 2.8, getHeight()/1.8, PLATFORM_COLOR);
    platform2.setBorder(true);
    platform2.setBorderWidth(PLATFORM_BORDER_WIDTH);
    backgroundArray.push(platform2);
    
    var platform3 = drawRectangle(getWidth()/3.6, PLATFORM_WIDTH, getWidth() / 1.5, getHeight() / 1.3, PLATFORM_COLOR);
    platform3.setBorder(true);
    platform3.setBorderWidth(PLATFORM_BORDER_WIDTH);
    backgroundArray.push(platform3);
}

function drawPlayer(pl, color, costume, x, y){
    playerParts = []
    var player = drawRectangle(PLAYER_WIDTH, PLAYER_HEIGHT, x, y, color);
    var eye1 = drawRectangle(EYE_WIDTH, EYE_HEIGHT, x + EYE_OFFSET, y + EYE_Y_OFFSET, Color.white);
    var eye2 = drawRectangle(EYE_WIDTH, EYE_HEIGHT, x + EYE_OFFSET * 3, y + EYE_Y_OFFSET, Color.white);
    var pupil1 = drawRectangle(PUPIL_WIDTH, PUPIL_HEIGHT, x + EYE_OFFSET + PUPIL_OFFSET, y + EYE_Y_OFFSET + EYE_HEIGHT - PUPIL_Y_OFFSET, Color.black);
    var pupil2 = drawRectangle(PUPIL_WIDTH, PUPIL_HEIGHT, x + EYE_OFFSET * 3 + PUPIL_OFFSET, y + EYE_Y_OFFSET + EYE_HEIGHT - PUPIL_Y_OFFSET, Color.black);
    player.setBorder(true);
    player.setBorderWidth(3);
    add(player);
    add(eye1);
    add(pupil1);
    add(eye2);
    add(pupil2);
    playerParts.push(player);
    playerParts.push(eye1);
    playerParts.push(pupil1);
    playerParts.push(eye2);
    playerParts.push(pupil2);
    
    if(costume == "gentleman"){
        var suit = new Polygon();
        suit.addPoint(x, y + PLAYER_HEIGHT);
        suit.addPoint(x + PLAYER_WIDTH, y + PLAYER_HEIGHT);
        suit.addPoint(x + PLAYER_WIDTH, y + PLAYER_HEIGHT - COSTUME_HEIGHT);
        suit.addPoint(x + 1/2 * PLAYER_WIDTH, y + PLAYER_HEIGHT - SHIRT_HEIGHT);
        suit.addPoint(x, y + PLAYER_HEIGHT - COSTUME_HEIGHT);
        add(suit);
        playerParts.push(suit);
        
        var shirt = new Polygon();
        shirt.addPoint(x, y + PLAYER_HEIGHT - COSTUME_HEIGHT);
        shirt.addPoint(x + 1/2 * PLAYER_WIDTH, y + PLAYER_HEIGHT - SHIRT_HEIGHT);
        shirt.addPoint(x + PLAYER_WIDTH, y + PLAYER_HEIGHT - COSTUME_HEIGHT);
        shirt.setColor(Color.white);
        shirt.setBorder(true);
        shirt.setBorderWidth(1);
        add(shirt);
        playerParts.push(shirt);
        
        var bowX = x + PLAYER_WIDTH / 2 - BOW_HEIGHT*2;
        var bowY = y + PLAYER_HEIGHT - SHIRT_HEIGHT - (COSTUME_HEIGHT - SHIRT_HEIGHT)/2 - 2/3 * BOWTIE_WIDTH;
        
        var bowtie = new Polygon();
        bowtie.addPoint(bowX, bowY);
        bowtie.addPoint(bowX, bowY + BOWTIE_WIDTH);
        bowtie.addPoint(bowX + BOW_HEIGHT * 4, bowY);
        bowtie.addPoint(bowX + BOW_HEIGHT * 4, bowY + BOWTIE_WIDTH);
        bowtie.setColor(Color.red);
        bowtie.setBorder(true);
        bowtie.setBorderWidth(1);
        add(bowtie); 
        playerParts.push(bowtie);
        
    } else if (costume == "wizard"){
        var hat = new Polygon();
        hat.addPoint(x, y);
        hat.addPoint(x + PLAYER_WIDTH, y);
        hat.addPoint(x + 1/2* PLAYER_WIDTH, y - 1/2.5 * PLAYER_HEIGHT);
        hat.setBorder(true);
        hat.setColor(Color.blue);
        hat.setBorderWidth(2.4);
        playerParts.push(hat);
        add(hat);
        
        var shirt = drawRectangle(PLAYER_WIDTH, COSTUME_HEIGHT, x, y + PLAYER_HEIGHT - COSTUME_HEIGHT, Color.blue);
        shirt.setBorder(true);
        shirt.setBorderWidth(2);
        playerParts.push(shirt);
        
        
        var moon1 = drawMoon(x + 1/3 * PLAYER_WIDTH, y + PLAYER_HEIGHT - 1/4 * COSTUME_HEIGHT);
        var moon2 = drawMoon(x + 3/4 * PLAYER_WIDTH, y + PLAYER_HEIGHT - 1/4 * COSTUME_HEIGHT);
        var moon3 = drawMoon(x + 1.1/2 * PLAYER_WIDTH, y + PLAYER_HEIGHT - 2/3 * COSTUME_HEIGHT);
        var moon4 = drawMoon(x + 1.1/2*PLAYER_WIDTH, y - 1/4*PLAYER_WIDTH);
        
    }
    if(it == pl){
        var indicator = new Polygon();
        indicator.addPoint(x + PLAYER_WIDTH/2, y - PLAYER_HEIGHT / 20);
        indicator.addPoint(x + PLAYER_WIDTH/2 - PLAYER_WIDTH/4, y - PLAYER_HEIGHT / 7);
        indicator.addPoint(x + PLAYER_WIDTH/2 + PLAYER_WIDTH/4, y - PLAYER_HEIGHT / 7);
        indicator.setColor(Color.white);
        indicator.setBorder(true);
        indicator.setBorderWidth(3);
        add(indicator);
        playerParts.push(indicator);
    }
    return playerParts;
}

function drawMoon(x, y){
    var moonArray = []
    var moon = drawCircle(MOON_RADIUS, x, y, "#f0e465");
    var oval = new Oval(MOON_RADIUS * 5/3, MOON_RADIUS * 6/3);
    oval.setPosition(x + 1/3 * MOON_RADIUS, y);
    oval.setColor(Color.blue);
    playerParts.push(moon);
    playerParts.push(oval);
    add(moon);
    add(oval);
    
    
}

function del(arr){
    for (var i = 0; i < arr.length; i++){
        remove(arr[i]);
    }
}

function playerMove(player, dx, dy){
    for(var i = 0; i < player.length; i++){
        player[i].move(dx, dy);
    }
}

function playerSetPos(player, x, y){
    
    if(player == p1){
        del(p1);
        p1 = drawPlayer("p1", BLUE_PLAYER_COLOR, p1Costume, x, y);
    } else {
        del(p2);
        p2 = drawPlayer("p2", RED_PLAYER_COLOR, p2Costume, x, y);
    }
}

function addArray(arr){
    for(var i = 0; i < arr.length; i++){
        add(arr[i]);
    }
}

function playerGetY(player){
    return player[0].getY() - PLAYER_HEIGHT;
}

function playerGetX(player){
    return player[0].getX() - PLAYER_HEIGHT;
}
var counter = 0;
function collision(player){
    if(player == p1){
        var x = playerGetX(player);
        var y = playerGetY(player);
        var topLeft = getElementAt(x + PLAYER_WIDTH * 3/2, y - PLAYER_HEIGHT);
        var topRight = getElementAt(x + PLAYER_WIDTH * 2, y);
        var midLeft = getElementAt(x + PLAYER_WIDTH * 3/2 , y + 1/2 * PLAYER_HEIGHT);
        var midRight = getElementAt(x + PLAYER_WIDTH * 2, y + 1/2 * PLAYER_HEIGHT);
        var bottomLeft = getElementAt(x + PLAYER_WIDTH * 3/2, y + PLAYER_HEIGHT * 2);
        var bottomRight = getElementAt(x + PLAYER_WIDTH * 2, y + PLAYER_HEIGHT * 2);
        
        if(bottomLeft == null){
        var blNull = true;
        }
        if(bottomRight == null){
            var brNull = true;
        }
        if(midLeft == null){
            var mlNull = true;
        }
        if(midRight == null){
            var mrNull = true;
        }
    }
    
    if(player == p2){
        var p2x = playerGetX(player);
        var p2y = playerGetY(player);
        var p2topLeft = getElementAt(p2x + PLAYER_WIDTH * 3/2, p2y - PLAYER_HEIGHT);
        var p2topRight = getElementAt(p2x + PLAYER_WIDTH * 2, p2y);
        var p2midLeft = getElementAt(p2x + PLAYER_WIDTH * 3/2 , p2y + 1/2 * PLAYER_HEIGHT);
        var p2midRight = getElementAt(p2x + PLAYER_WIDTH * 2, p2y + 1/2 * PLAYER_HEIGHT);
        var p2bottomLeft = getElementAt(p2x + PLAYER_WIDTH * 3/2, p2y + PLAYER_HEIGHT * 2);
        var p2bottomRight = getElementAt(p2x + PLAYER_WIDTH * 2, p2y + PLAYER_HEIGHT * 2);
        
        if(p2bottomLeft == null){
        var p2blNull = true;
        }
        if(p2bottomRight == null){
            var p2brNull = true;
        }
        if(p2midLeft == null){
            var p2mlNull = true;
        }
        if(p2midRight == null){
            var p2mrNull = true;
        }
    }
    
    
    
    if(player == p1){
        
        //player and ground collision
        if(levelArray.includes(bottomLeft)){
            player1Colliding = true;
            p1OnGround = true;
        } else if(levelArray.includes(bottomRight)){
            player1Colliding = true;
            p1OnGround = true;
        } else if(levelArray.includes(topLeft)){
            player1HeadColliding = true;
        } else if(levelArray.includes(topRight)){
            player1HeadColliding = true;
        } else if(levelArray.includes(midLeft)){
            player1Colliding = true;
        } else if(levelArray.includes(midRight)){
            player1Colliding = true;
        } else if((blNull || bottomLeft.getType() != Rectangle) && (brNull || bottomRight.getType() != Rectangle) && (mlNull || midLeft.getType() != Rectangle) && (mrNull || midRight.getType() != Rectangle)) {
            player1Colliding = false;
        }
        
        // player to player collision
        if(p2.includes(bottomLeft) && it == "p1"){
            it = "p2";
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
        } else if(p2.includes(bottomRight) && it == "p1"){
            it = "p2";
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
        } else if(p2.includes(topLeft) && it == "p1"){
            it = "p2";
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
        } else if(p2.includes(topRight) && it == "p1"){
            it = "p2";
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
        } else if(p2.includes(midLeft) && it == "p1"){
            it = "p2";
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
        } else if(p2.includes(midRight) && it == "p1"){
            it = "p2";
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
        }
    }
    
    if (player == p2){
        if(levelArray.includes(p2bottomLeft)){
            player2Colliding = true;
            p2OnGround = true;
        } else if(levelArray.includes(p2bottomRight)){
            player2Colliding = true;
            p2OnGround = true;
        }  else if(levelArray.includes(p2topLeft)){
            player2HeadColliding = true;
        } else if(levelArray.includes(p2topRight)){
            player2HeadColliding = true;
        } else if(levelArray.includes(p2midLeft)){
            player2Colliding = true;
        } else if(levelArray.includes(p2midRight)){
            player2Colliding = true;
        } else if((p2blNull || p2bottomLeft.getType() != Rectangle) && (p2brNull || p2bottomRight.getType() != Rectangle) && (p2mlNull || p2midLeft.getType() != Rectangle) && (p2mrNull || p2midRight.getType() != Rectangle)) {
            player2Colliding = false;
        }
        
        if(p1.includes(p2bottomLeft) && it == "p2"){
            it = "p1";
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
        } else if(p1.includes(p2bottomRight) && it == "p2"){
            it = "p1";
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
        } else if(p1.includes(p2topLeft) && it == "p2"){
            it = "p1";
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
        } else if(p1.includes(p2topRight) && it == "p2"){
            it = "p1";
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
        } else if(p1.includes(p2midLeft) && it == "p2"){
            it = "p1";
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
        } else if(p1.includes(p2midRight) && it == "p2"){
            it = "p1";
            playerSetPos(p1, playerGetX(p1), playerGetY(p1));
            playerSetPos(p2, playerGetX(p2), playerGetY(p2));
        }
    }
}

function warp(){
    if(playerGetX(p1) >= 700){
        playerSetPos(p1, 10, playerGetY(p1) + PLAYER_HEIGHT);
    }
    if(playerGetX(p1) <= -100){
        playerSetPos(p1, 690, playerGetY(p1) + PLAYER_HEIGHT);
    }
    if(playerGetX(p2) >= 700){
        playerSetPos(p2, 10, playerGetY(p2) + PLAYER_HEIGHT);
    }
    if(playerGetX(p2) <= -100){
        playerSetPos(p2, 690, playerGetY(p2) + PLAYER_HEIGHT);
    }
}

function player1Move(){
    if(player1Direction == "right"){
        playerMove(p1, STEP_INCREMENT, 0);
        player1Distance += STEP_INCREMENT;

    }
    if(player1Direction == "left"){
        playerMove(p1, -STEP_INCREMENT, 0);
        player1Distance += STEP_INCREMENT;
    }
}

function player2Move(){
    if(player2Direction == "right"){
        playerMove(p2, STEP_INCREMENT, 0);
        player2Distance += STEP_INCREMENT;
    }
    if(player2Direction == "left"){
        playerMove(p2, -STEP_INCREMENT, 0);
        player2Distance += STEP_INCREMENT;
    }
}

function player1Jump(){
    playerMove(p1, 0, -JUMP_INCREMENT);
    player1JumpDistance += JUMP_INCREMENT;
    p1OnGround = false;
    if (player1JumpDistance >= MAX_JUMP_HEIGHT || player1HeadColliding){
        player1JumpDistance = 0;
        player1Jumping = false;
        stopTimer(player1Jump);
    }
}

function player2Jump(){
    playerMove(p2, 0, -JUMP_INCREMENT);
    player2JumpDistance += JUMP_INCREMENT;
    p2OnGround = false;
    if (player2JumpDistance >= MAX_JUMP_HEIGHT || player2HeadColliding){
        player2JumpDistance = 0;
        player2Jumping = false;

        stopTimer(player2Jump);
    }
}

function gravity(){
    for (var i = 0; i < p1.length; i++){
        if(!player1Jumping && !player1Colliding){
            playerMove(p1, 0, GRAVITY);
        }
    }
    for(var i = 0; i < p2.length; i++){
        if(!player2Jumping && !player2Colliding){
            playerMove(p2, 0, GRAVITY);
        }
    }
}
