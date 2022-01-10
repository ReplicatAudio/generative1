const fs = require('fs');

module.exports = ()=>{

  const userLoc = process.argv[2];
  if(!userLoc){
    console.log('WARNING: CANT FIND CONFIG FILE');
  }
  const configLoc = '__dirname/'+( userLoc ? userLoc : 'config.json');
  // './' for local to running dir
  let c = {
    "name":"test",
    "sequence_length":256,
    "mode":"major",
    "key":"C",
    "interval_weights":[1,8,1,1,1,1,1],
    "ch_interval_weights":[1,1,1,1,1,1,1,1,1,1,1],
    "octave_weights":[0,0,0,8,16,4,0,0,0,0,0],
    "harmonic_interval_weights":[0,0,0,0,1,1,1,1,0,0,0,0],
    "sequence_probability":[100,100,100,50],
    "sequence_bend":[0],
    "sequence_velocity":[50,75,65,100],
    "sequence_duration":["1","2","?","?"],
    "sequence_harmony_probability":[0,0,0,0],
    "duration_weights":{
      "t1024":0,
      "t512":0,
      "t256":0,
      "1":0,
      "2":0,
      "d2":0,
      "dd2":0,
      "4":1,
      "4t":0,
      "d4":0,
      "dd4":0,
      "8":0,
      "8t":0,
      "d8":0,
      "dd8":0,
      "16":0,
      "16t":0,
      "32":0,
      "64":0
    },
    
    "limit_harmony_to_scale":true,
    "overall_probability":100,
    "velocity_min":20,
    "velocity_max":100,
    "bend_min":-1.0,
    "bend_max":1.0,
    "output_dir":"./output",
    "generate_json":true
  };
  try {
    if (fs.existsSync(configLoc)) {
      //file exists
      c = require(configLoc);
    }
  } catch(err) {
    console.error(err);
    console.log('Using sample config...');
  }
  return c;
  
  
  
};

