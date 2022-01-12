const fs = require('fs');

const MidiWriter = require('midi-writer-js');

//const configLoader = require('./configLoader.js');
//const c = configLoader();



const generateSequence = require('./generateSequence');


module.exports = (c)=>{
  console.log(c);
  // Start with a new track
  let track = new MidiWriter.Track();

  // Define an instrument (optional):
  track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

  track = generateSequence(track,c);

  // Generate a data URI
  const write = new MidiWriter.Writer(track);
  //console.log(write.dataUri());
  if(!fs.existsSync(c.output_dir)){
    fs.mkdirSync(c.output_dir,{ recursive: true });
  }
  let name = c.name;
  if(c.append_timestamp){
    const timestamp = Date.now();
    name = c.name+timestamp
  }
  fs.writeFileSync(c.output_dir+'/'+name+'.mid',write.buildFile());
  if(c.generate_json){
    fs.writeFileSync(c.output_dir+'/'+name+'.config.json',JSON.stringify(c,null,2));
  }
  return 1;
}

