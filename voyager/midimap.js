//midimap needs a funciones array and some ids
var mapping=false;
var funcSelected;
var chequeado;
var botonClicado;
var caja=document.getElementById("midimapper")
let infinito=false;

function midimap(){
  if(mapping){
    caja.style="display:none";
    mapping=false
    funcSelected="";
    chequeado="";

  }else{
    caja.style="display:block";
    caja.style.height=alt*.8;
    caja.style.width=amp*.8;
    mapping=true;
  }
}

buttover=function(d){
  d.path[0].style.backgroundColor="yellow"
}
buttout=function(d){
  d.path[0].style.backgroundColor=""
}

buttclick=function(d){//clico funcion para asignar
  botonClicado=d.path[0].parentElement.parentElement;// fila
  funcSelected=d.path[0].textContent;//recojo el nombre de la función
  chequeado=botonClicado.lastChild.firstChild.checked;
  console.log("chequeado= "+chequeado);
}

function addFunctions(){//dibuja tabla
  var tabla=document.getElementById("mitabla");

  for (let i in mapaMidi) {
    var cont=document.createElement("div");
    var bot=document.createElement("div");

    let t = document.createTextNode(i);
    let d=document.createElement("div");
    let t2 = document.createTextNode(mapaMidi[i][0]+" - "+mapaMidi[i][1]);
    let toggle=document.createElement("input");
    toggle.type="checkbox";
    toggle.className="toggl";
    let row=tabla.insertRow();
    let cel1=row.insertCell(0);
    bot.className="boto";
    bot.onmouseover=buttover;
    bot.onmouseout=buttout;
    bot.onclick=buttclick;
    bot.appendChild(t);
    cel1.appendChild(bot)
    let cel2=row.insertCell(1);
    d.appendChild(t2);
    d.className="knob";
    cel2.appendChild(d);
    let cel3=row.insertCell(2);
    cel3.appendChild(toggle);
    cel3.onclick=function(){
      this.parentElement.children[1].firstChild.textContent="";
      chequeado=!chequeado;
      }
  }
}

function mapea(d){// estoy mapeando y recibo MIDI data

  mapaMidi[funcSelected]=[d.data[0],d.data[1],chequeado,d.srcElement.name];//asigno el num del knob a la funcion
  botonClicado.children[1].children[0].textContent=d.data[0]+" - "+d.data[1]// infinite?
}

function mueveknob(k){// recibo mensaje midi   k=midi message
  if(k.data.length<3){mueveAlgo(k.data)}
  for (let i in mapaMidi) {// i== nombre función
    if(mapaMidi[i][1]==k.data[1]){// con ese knob...
      infinito=mapaMidi[i][2];// definimos el segundo parametro
      eval(i+"(" + k.data[2] +","+infinito+")"); // y zasca  ejecutamos i(v,infi)
      return  // se puede borrar el return para potes con mas de una funcion?
    }
  }
}

mueveAlgo=function(data){// para mensajes midi de dos numeros
  if (data.length==2){
    eval(mapaMidiFast[data[1]][0])(v,infinito);
  }else{
    console.log("data.length==1 o menos")
  }
}

function muestraBot(d){
  document.getElementById("MIDI").style.backgroundColor="green"
}
function escondeBot(d){
    document.getElementById("MIDI").style.backgroundColor="black"
}
