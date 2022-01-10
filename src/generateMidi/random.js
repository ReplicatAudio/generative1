const generateScale = require('./generateScale');
const {weightArr, weightObj} = require('./util');

const {octaves, durations} = require('./data');

module.exports = {
  note,
  harmony,
  octave,
  duration,
  chance,
  number, 
  velocity,
  bend
};

function number(min, max){
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}

function float(min,max){
  const r = Math.random()*(max-min) + min;
  return r;
}

function arrItem(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function bend(min=-1, max=1){
  return float(min,max);
}

function chance(a,b){//75,100 = 75 in 100 (75%)
  const res = Math.floor(Math.random()*b);
  if(res+1<=a){
    return true;
  }else{
    return false;
  }
}

function harmony(op={note:'C',mode: 'major', key:'C', weights:[0,0,0,0,0,0,0,0,1,0,0,0], limit_to_scale:true}){
  let chScale = generateScale('chromatic',op.note);
  const chScaleWeighted = weightArr(chScale, op.weights);
  let note = arrItem(chScaleWeighted);
  if(op.limit_to_scale){
    let scale = generateScale(op.mode,op.key);
    // Check if a harmony in scale is possible
    let possible = false;
    for(let chNote of chScaleWeighted){
      if(scale.includes(chNote)){
        possible = true;
      }
    }
    if(!possible){
      // no harmony is possible
      // return original note
      return op.note;
    }
    while(!scale.includes(note)){
      note = arrItem(chScaleWeighted);
    }
  }
  return note;
}

function note(op={mode: 'major', key:'C', weights: [1,1,1,1,1,1,1], ch_weights:[1,1,1,1,1,1,1,1,1,1,1]}){
  let weights;
  switch(op.mode){
    case 'major':
      weights = op.weights;
      break;
    case 'minor':
      weights = op.weights;
      break;
    case 'chromatic':
      weights = op.ch_weights;
      break;
  }
  // Weight the scale
  const scale = generateScale(op.mode, op.key);
  const weightedScale = weightArr(scale, weights);
  // Choose random index
  const intervalIndex = Math.floor(Math.random()*weightedScale.length);
  // Grab scale interval at index
  const note = weightedScale[intervalIndex];
  //
  return note;
}

function octave(weights=[1,1,1,1,1,1,1,1,1,1,1]){
  const octWeighted = weightArr(octaves, weights);
  return octWeighted[Math.floor(Math.random()*octWeighted.length)];
}

function velocity(min=0,max=100){
  if(max>100){max=100}
  if(min<0){min=0}
  return number(min,max);
}

function duration(weights){
  const durWeighted = weightObj(durations, weights);
  return durWeighted[Math.floor(Math.random()*durWeighted.length)];
}


// function duration(min=0,max=8){
//   /*
//   2
//   4
//   8
//   16
//   32
//   64
//   */
//   // 0 = 1/128 beat
//   // 1 = 1/64 beat
//   // 2 = 1/32 beat 
//   // 3 = 1/16 beat
//   // ...
//   // 7 = 1 beat (T128)
//   const r = number(min, max);
//   const sqr = Math.pow(2,r);
//   return 'T'+sqr;
// }