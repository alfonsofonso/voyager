//planets

var starLoc=false;//lineas de mirilla
var velSpacial=2000;
var radioCircle=2;
var radioCircleFinal=24;
var gris=255;
var grisRandom=false;
var starLocThick=1;
var starLocMaxThick=300;

var starLocColor="rgb(256,256,256)";
var radioVelo=false;//la key velociti influye en el radio del planeta
var horizon=alt/2;
let vertical=true;
let fadeTime=10000;

function ponEstrella(a,v){// es un circulo-planta-cuadrado-nave
  let vel;
  let ang= Math.random()*360;
  let radius=radio+margen;
  let equis=(radius/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  let igriega=(radius/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang))+alt/2;

  vel=velSpacial;

  let radioVel=radioCircle;
  if(radioVelo){radioVel*v/10}
  if (grisRandom){gris=Math.round(Math.random()*256)}
  var c = new createjs.Shape();
  let micolor="rgb("+gris+","+gris+","+gris+")";
  c.graphics.beginFill(micolor).drawCircle(2, 2, radioVel);
  c.x = equis
  c.y = igriega;
      creaDestello(equis,igriega+horizon)
  stage.addChild(c);

  var tamanyo=Math.random()*radioCircleFinal;
  createjs.Tween.get(c)
    .to({ x:radius * Math.cos(ang)+amp/2,y:radius*Math.sin(ang)+alt/2,
      scaleX:tamanyo, scaleY:tamanyo},vel, createjs.Ease.getPowIn(2))
    .call(handleComplete, [c]);
}

function creaDestello(x,y){
  if(!starLoc){return}
  var destello=new createjs.Shape();
  starLocColor=getRandomGris()

  if (vertical){
    destello.graphics.beginFill(starLocColor).drawRect(-starLocThick/2,-1000,starLocThick,9000);//vertical
    destello.x=x*Math.random()*2;destello.y=y;
  }else{
    destello.graphics.beginFill(starLocColor).drawRect(-2000,horizon/2,8000,starLocThick);//horizontal
    destello.x=x;destello.y=y*(Math.random()/8);
  }
  console.log("destell:"+x+" "+y)
  stage.addChild(destello);
  createjs.Tween.get(destello).to({alpha:0 }, fadeTime).call(handleComplete, [destello]);
}//mirilla

function velocidad(a,i){
  if(!i){//1-127
    velSpacial=a*a*8;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>60000){
      velSpacial=60000;}
  }else{// si es encoder
    let e=a-64;
    velSpacial+=e;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>20000){
      velSpacial=20000;}
    }
  console.log("velSp: "+velSpacial+" "+i);
}

function radioPlaneta(a,i){
  if(!i){
    radioCircle=a/2.5;
  }else{//encoder
    radioCircle+=a-64;
  }
  if (radioCircle<1){radioCircle=1}else if(radioCircle>50){radioCircle=50}//corrector
  console.log("radioPlantet:" +radioCircle)
}//radio planets

function cercaniaPlaneta(a,i){//radio planets when near
  if(!i){
      radioCircleFinal=a;
    }else if(radioCircleFinal>0&&radioCircleFinal<500){
      radioCircleFinal+=a-64;
  }
  console.log("radioNearPlantet:" +radioCircleFinal);
}

function luzPlaneta(a,i){
  if(!i){
    gris=a*2;
  }else if(gris>0&&gris<256){
      gris+=a-64;
  }
  console.log("#" +gris)
}

function luzPlanetaAlienSWITCH(d,v){
  if(grisRandom){grisRandom=false}else{grisRandom=true}
  console.log("luzPlanetaAlienSWITCH: "+grisRandom);
}

function locationSWITCH(d,v){
  if(starLoc){starLoc=false}else{starLoc=true}
    console.log("locationSWITCH: "+starLoc);
}

function clearButton(d,v){

    console.log("clear!");
    stage.removeAllChildren();

}

function starLocThickness(d,inf){
  if(!inf){
    starLocThick=Math.random()*d*10+1;
  }else{
    starLocThick+=d;
  }
    console.log("thickness:"+starLocThick)
}
function verticalitySwitch(d,v){
  if (vertical){vertical=false}else{vertical=true}
}

function horizonHeight(d,inf){
  if(!inf){
    horizon=d*24-1600;
  }else{
    horizon+=d;
  }
  console.log("horizon: "+horizon)
}

function landFadeTime(d,inf){
  if(!inf){
    fadeTime=d*100;
  }else{
    fadeTime+=d;
  }
  console.log("fadeTime: "+fadeTime)
}
