const MidiWriter = require('midi-writer-js');

const random = require('./random');

// const configLoader = require('./configLoader.js');
// const c = configLoader();

module.exports = (track, c)=>{
  for(let i = 0; i < c.sequence_length; i++){

    // Generate note (tonic) and harmony
    let note = random.note({mode:c.mode,key:c.key, weights: c.interval_weights, ch_weights:c.ch_interval_weights});
    let harmony = random.harmony({note:note,mode:c.mode,key:c.key, weights: c.harmonic_interval_weights, limit_to_scale:c.limit_harmony_to_scale});
    let harmony2 = random.harmony({note:note,mode:c.mode,key:c.key, weights: c.harmonic_interval_weights, limit_to_scale:c.limit_harmony_to_scale});
    while(harmony2 === harmony){
      harmony2 = random.harmony({note:note,mode:c.mode,key:c.key, weights: c.harmonic_interval_weights, limit_to_scale:c.limit_harmony_to_scale});
    }
    
    const dur = generateDuration(i,c);

    // Generate octaves
    const oct = random.octave(c.octave_weights);
    const oct2 = random.octave(c.octave_weights);
    const oct3 = random.octave(c.octave_weights);
    
    const velocity = generateVelocity(i,c);
    
    const probCheck = checkProbability(i,c);
    
    const harmonyProbCheck = checkHarmonyProbability(i,c);

    let eventNotes = [];
    if(harmonyProbCheck){
      eventNotes = [note+oct, harmony+oct2, harmony2+oct3];
    }else{
      eventNotes = [note+oct]
    }
    // Setup midi event data
    let eventData = {
      pitch: eventNotes, 
      duration: dur, 
      velocity:velocity
    };
    if(!probCheck){
      // special data for "blank" notes
      eventData = {
        pitch: 'C999', //needs secondary notes as well
        duration: 0, 
        velocity:0,
        wait: dur
      };
    }
    // Write midi data
    const event = new MidiWriter.NoteEvent(eventData);
    track.addEvent(event);
    console.log(eventData);
    // Generate bend 
    const bend = generateBend(i,c);
    track.setPitchBend(bend);
    //
  }  
  return track;
}

function generateDuration(i,c){
  // Generate duration
  let dur;
  const normSeqDurIndex = i % c.sequence_duration.length;
  if(c.sequence_duration[normSeqDurIndex]==='?'){
    dur = random.duration(c.duration_weights);
  }else{
    dur = c.sequence_duration[normSeqDurIndex];
  }
  return dur;
}

function generateVelocity(i,c){
  // Generate velocity
  let velocity;
  const normSeqVelIndex = i % c.sequence_velocity.length;
  if(c.sequence_velocity[normSeqVelIndex]==='?'){
    velocity = random.velocity(c.velocity_min, c.velocity_max);
  }else{
    velocity = c.sequence_velocity[normSeqVelIndex];
    if(velocity>100){velocity=100}
    if(velocity<0){velocity=0}
  }
  return velocity;
}

function generateBend(i,c){
  const normSeqBendIndex = i % c.sequence_bend.length;
  let bend;
  if(c.sequence_bend[normSeqBendIndex]==='?'){
    bend = random.bend(c.bend_min, c.bend_max);
  }else{
    bend = c.sequence_bend[normSeqBendIndex];
    if(bend>1.0){bend=1.0}
    if(bend<-1.0){bend=-1.0}
  }
  return bend;
}

function checkProbability(i,c){
  // Note probability checks
  const normSeqProbIndex = i % c.sequence_probability.length;
  const indexSeqProb = c.sequence_probability[normSeqProbIndex];
  const probCheckSeq = random.chance(indexSeqProb,100);
  const probCheckOverall = random.chance(c.overall_probability,100);
  const probCheck = probCheckSeq && probCheckOverall;
  return probCheck;
}

function checkHarmonyProbability(i,c){
  // Harmony probability checks
  const normSeqHarmProbIndex = i % c.sequence_harmony_probability.length;
  const harmonyProb = c.sequence_harmony_probability[normSeqHarmProbIndex];
  return random.chance(harmonyProb,100);
}