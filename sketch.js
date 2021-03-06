var dog, happyDog, database, foodS, foodStock, dogImg;
var database;
function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(200,200,30,40);
  dog.addImage(dogImg);
  dog.scale = 0.2;


  
}


function draw() { 
  background(46, 139, 87);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }


  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(20);
  text("Note: Press UP_ARROW key to feed Drago milk!", 30,400);

}
function readStock(data){
  foodS=data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })

}
