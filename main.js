//archery game version 1.0 by Austine Samuel
if(typeof getQr=="undefined"){
  var getQr=(e)=>document.querySelector(e)
}

if(getQr("canvas")==null){
  throw "oops canvas not found!\n\n this script can only be use in html container canvas element";
}

const canvas=getQr("canvas");
const ctx=canvas.getContext("2d");
canvas.height=innerHeight;
canvas.width=innerWidth;
getQr("body").style.padding=0;
getQr("body").style.margin=0;
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
//this script set the canvcas for everything needed

completedLoadedImages={}


const bulletImg=new Image();
bulletImg.src="images/bullet.png"
bulletImg.onload=()=>{
  completedLoadedImages.bulletImg=true;
}

const bulletDouble = new Image();
bulletDouble.src = "images/bulletDouble.png"
bulletDouble.onload=()=>{
  completedLoadedImages.bulletDouble=true
}

const bulletSmall = new Image();
bulletSmall.src = "images/bulletSmall.png"
bulletSmall.onload=()=>{
  console.log("loaded")
  completedLoadedImages.bulletSmall=true
}

const jet=new Image();
jet.src="images/jet.png"
jet.onload=()=>{
  completedLoadedImages.jet=true;
}

const jetE=new Image();
jetE.src="images/boss.png";
jetE.onload=()=>{
  completedLoadedImages.jetE=true
}
const bomb=new Image();
bomb.src="images/bomb.png";
bomb.onload=()=>{
  completedLoadedImages.bomb=true;
}
const fire=new Image();
fire.src="images/fire.png";
fire.onload=()=>{
  completedLoadedImages.fire=true;
}
const player={energy:100,score:0}
const enemy={energy:100,shoot:false}
const playerBulletVelocity=11;
const enemyBulletVelocity=10;
const playerBulletsList=[];
const bombList=[];
const enemyBulletsList=[];
let playerBulletPlusIndex=0;
let enemyBulletPlusIndex=100;

const mousePosition={
  x:canvas.width/2,
  y:0
}
const enemyPosition={
  x:100,y:200
}

const handleTouch=(e)=>{
  mousePosition.x=e.touches[0].clientX
  mousePosition.y=e.touches[0].clientY
 // if(mousePosition.x<100)mousePosition.x=100
}

const handleMouse=(e)=>{
  mousePosition.x=e.clientX
  mousePosition.y=e.clientY
}

canvas.addEventListener("touchstart",handleTouch)
canvas.addEventListener("touchend",()=>{
  huntTimeout=0;
  shootByMouse=false;
});

canvas.addEventListener("touchmove",(e)=>{
  handleTouch(e);
  shootByMouse=true;
})
canvas.addEventListener("mousemove",handleMouse)
canvas.addEventListener("mouseup",()=>{
  huntTimeout=0;
  
  shootByMouse=false;
  })

  let shootByMouse=false;
canvas.addEventListener("mousedown",(e)=>{
  handleMouse(e);
  shootByMouse=true;

});

function drawFire(x,y){
  ctx.beginPath();
  ctx.drawImage(fire,x,y,50,50);
  ctx.closePath();
}
function drawPlayer(){
  ctx.beginPath();
  ctx.drawImage(jet,mousePosition.x-(75),canvas.height-180,100,150)
}
let i=0;
function drawEnemy(){
//  i++
  ctx.beginPath();
  ctx.font="10px cursive"
  ctx.drawImage(jetE, enemyPosition.x - (75),0, 100, 150)
  ctx.closePath()
  //ctx.restore()
}

function drawStatus(color, energy){
    ctx.beginPath();
    ctx.fillStyle=color
    ctx.strokeStyle=color
    ctx.fillRect(20,30, energy,8);
    ctx.rect(18,28,102,12);
    ctx.stroke()
    ctx.closePath();
  }
  
  function drawEnemyStatus(color, energy){
    ctx.beginPath();
    ctx.fillStyle=color
    ctx.strokeStyle=color
    ctx.fillRect(20,48, energy,8);
    ctx.rect(18,46,102,12);
    ctx.stroke()
    ctx.closePath();
  }
  




class PlayerBullets{
  constructor(x,y,bullet,bulletMark){
    this.x=x
    this.y=y
    this.bulletType=bullet.type,
    this.bulletName=bullet.name;
  }
  draw(){
    if(this.bulletType in completedLoadedImages){
    ctx.beginPath()
    ctx.drawImage(this.bulletName,this.x,this.y,20,30);
    ctx.closePath();
    }
    else{
      console.log("hshs",completedLoadedImages)
    }
  }
  CheckCollision(){
    //collision direction made possible here
  }
}



class EnemyBullets{
  constructor(x, y, bullet, bulletMark) {
    this.x = x
    this.y = y
    this.bulletType = bullet.type,
      this.bulletName = bullet.name;
  }
  
  
  draw() {
    if (this.bulletType in completedLoadedImages) {
      ctx.beginPath();
      
      ctx.drawImage(this.bulletName, this.x, this.y, 20, 30);
      ctx.closePath();
    }
    else {
      console.log("hshs", completedLoadedImages)
    }
  }
  drawBomb(x,y){
    if("bomb" in CompositionEvent){
      ctx.drawImage(bomb,x,y,100,80);
    }
  }
  CheckCollision() {
    //collision direction made possible here
  }
}

class Player{
  
}


let enemyDirectionX = -1;
let enemyDirectionY = -1;

let huntTimeout=200;
function huntPlayer(){
if(enemyPosition.x-50<mousePosition.x-50){
  enemyDirectionX=+1
}
if(enemyPosition.x-50>mousePosition.x-50){
  enemyDirectionX= -1
}
//target player successful
if (Math.floor(enemyPosition.x) - 100 == Math.floor(mousePosition.x) - 100 && !onBoom){
onBoom=true;
 throwBombs(random(1,10));
 
}
}

let onBoom=false;
function throwBombs(len=10,x,y){
 if(!onBoom)return
  for(let i=0;i<=len;i++){
    bombList.push({
      x:random(0,canvas.width),
      y:0,
      life:3,
    })
  }
 // return onBoom=false;
}

setInterval(()=>{
  enemy.shoot=!enemy.shoot
  if(!enemy.shoot){
    throwBombs(random(10,18))
  }
},random(1000,3000))

function enemyGames(){
  if(enemyBulletPlusIndex>=100 && enemy.shoot){//push new bullets to array
    enemyBulletPlusIndex=0;
    const bulletElement={type:"bulletSmall",name:bulletSmall}
    const x=enemyPosition.x-35;
    const y=(50);
   
    enemyBulletsList.push(new EnemyBullets(x,y,bulletElement,10))
    //console.log(playerBulletsList)
  }//end pushing new element
  
  //update play bullets 
 enemyBulletsList.forEach((e,i)=>{//looping through the list
   e.draw();
   e.y+=enemyBulletVelocity;
  if(e.CheckCollision()){
    // player score
    player.energy-=20;
    //enemy.mark+=e.mark;
    enemyBulletsList.splice(i,1);
  }
  
  if((e.y > canvas.height - 200) && (e.x < mousePosition.x && e.x + 60 > mousePosition.x)) {
    drawFire(e.x - 10, e.y);
    enemyBulletsList.splice(i, 1);
    player.energy -= 0.5
  }
  
  
  
    if(e.y<=0)enemyBulletsList.splice(i,1);
    
    
    //end enemylist loop
  })
  
  //
  drawEnemyStatus(`rgb(255,${enemy.energy+50},${enemy.energy*2+50})`, enemy.energy)
  const leftCondition=enemyPosition.x>canvas.width-20 && enemyPosition.x<canvas.width
   const rightCondition=enemyPosition.x< 20 && enemyPosition.x>0 
   
 
 if(leftCondition){
   enemyDirectionX = -1;
 }
 if(rightCondition){
   enemyDirectionX = 1;
 }
 
 
  huntTimeout++;
  /*
 ctx.font="30px arial";
 ctx.fillStyle="white"
 ctx.fillText(huntTimeout,100,100)*/
if(huntTimeout>200){
  huntTimeout=200;
  huntPlayer();
  
}
  
 enemyPosition.x += enemyDirectionX;
//hunting the player to shoot
  drawEnemy();
  enemyBulletPlusIndex+=12;
  //end enemy animations
}


function writeText(text,color="white"){
 huntTimeout=0;
 setTimeout(()=>{
  ctx.beginPath();
  ctx.fillStyle="black"
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle=color;
  ctx.font="28px arial";
  ctx.fillText(text, canvas.width/2-100,canvas.height/2);
  ctx.closePath()
 },0);
}

function animate(){
  //player bullets controls
  ctx.fillStyle="rgba(0,0,0,0.9)"
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  if(playerBulletPlusIndex>=100 && shootByMouse){//push new bullets to array
    playerBulletPlusIndex=0;
    
    const bulletElement={type:"jet",name:bulletImg}
    const x=mousePosition.x-35;
    const y=canvas.height-(200);
   
    playerBulletsList.push(new PlayerBullets(x,y,bulletElement,10))
    //console.log(playerBulletsList)
  }//end pushing new element
  
  //update play bullets 
  playerBulletsList.forEach((e,i)=>{//looping through the list
  e.draw();
  e.y-=playerBulletVelocity;
  if(e.CheckCollision()){
    // player score
    enemy.energy-=20;
    player.mark+=e.mark;
    playerBulletsList.splice(i,1);
  }
  
    if(e.y<=0)playerBulletsList.splice(i,1);
    //check plain collision one
   if(e.y < 50 && (e.x > enemyPosition.x-60  && e.x < enemyPosition.x)){
     playerBulletsList.splice(i,1);
     drawFire(e.x-25,e.y+40);
     enemy.energy-=0.5
   }
 
 if(bombList.length>0){
 bombList.forEach((ej,j)=>{
   if((ej.y<e.y && ej.y+30>e.y) && (ej.x>e.x-30 && ej.x< e.x+20)){
     //delete boom
     ej.life-=1;
     if(ej.life<=0){
     drawFire(e.x,e.y);
     bombList.splice(j,1)
     }
   }
   
 })
 }
 
 
 
 if (bombList.length > 0) {
   bombList.forEach((e, i) => {
   ctx.beginPath();
    ctx.drawImage(bomb, e.x, e.y, 30, 30);
         if (e.x > mousePosition.x - 42.5) {
           e.x -= 0.5
         }
         else {
           e.x += 0.5
         }
         //collision one
         if (e.y >= canvas.height - 200 && (e.x >= mousePosition.x - 60 && e.x <= mousePosition.x)) {
 
           drawFire(e.x, e.y);
           player.energy -= 5;
           bombList.splice(i, 1);
         }
         //end
// check bomb throw by enemy to player

     e.y+=random(0.05,1);
     if(e.y>canvas.height){
       bombList.splice(i,1);
     }
     
   })
 }
  else{
    onBoom=false;
  }
         //collision two
    //chech plain collision two
    
    //end player list loop
  })
  
  
  
  
  
  
  drawPlayer();
  drawStatus("green",player.energy);
  playerBulletPlusIndex+=12;
  //end player animations
  
  enemyGames();
 if(enemy.energy<0){
   writeText("You won !")
   return cancelAnimationFrame(animateLoop)
 }
 if(player.energy<0){
   writeText("Your plain Crashed!","red");
   return cancelAnimationFrame(animateLoop)
 }
  animateLoop=requestAnimationFrame(animate);
  
 
}

let animateLoop=()=>1
onload=()=>{
  animate();
onclick=()=>{
//  canvas.requestfullScreen()
}
}

