Tone.Transport.bpm.value=100;
Tone.Transport.latencyHint="interactive";

var suena=true;
var keys=false;
var volSynth=-20;
var arrNotas=[];

var sinte = new Tone.PolySynth(12,Tone.Synth);
sinte.set({
  "oscillator" : {"type" : "sine"},
	"envelope" : {
		"attack" : 0.02,
		"decay": 2,
		"sustain":0.5,
		"release":.2
}});
sinte.volume.value=volSynth;
sinte.toMaster();
//Tone.Transport.start()

tocanota=function(a,b){//note on
    if(!suena) {return}
    var n=Tone.Frequency(a, "midi").toNote();
    var v=Math.round((b/127)*90)/100+.1;
    sinte.triggerAttack(n,Tone.Transport.now,v);
    console.log("n:"+n+" vel:"+v)
    arrNotas.push(a)
}

paranota=function(a){//"note off"
  if(!suena) {return}
  var n=Tone.Frequency(a, "midi").toNote();
  arrNotas.splice(arrNotas.indexOf(a),1);
  sinte.triggerRelease([n])
}

volumen=(a)=>{
  sinte.volume.value=-64+a/2;
  console.log("vol sinte= "+sinte.volume.value)
}
