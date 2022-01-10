## Generative MIDI

A project for making generative music with JS. 

## Running
```
node index <config-file.json>
```
Config file defaults to `./config.json`.

## Example `config.js`
```
{
  "name":"sample",// Name of the file
  "sequence_length":4206,// How many notes to generate
  "mode":"chromatic",// What mode to use [major, minor, chromatic]
  "offset":0, // Use this to change the key (semitones)
  "interval_weights":[1,8,1,1,1,1,1], // Weighted probability of each interval being selected
  "ch_interval_weights":[1,1,1,1,1,1,1,1,1,1,1],// Weighted probability of each interval being selected (for chromatic)
  "octave_weights":[0,0,0,0,16,4,0,0,0,0,0],// Weighted probability of each octave being selected
  "sequence_probability":[100,100,0,100],// Absolute % probability of each note in the sequence being played
  "sequence_velocity":[10,20,30,40,50,60,70,80,90,"?"],// Automate velocity. "?" uses random velocity
  "sequence_duration":[6,6,6,5,5], // Automate duration. "?" uses random duration
  "overall_probability":100,// Overall chance of playing a note (absolute %)
  "duration_min":7,
  "duration_max":7,
  "velocity_min":20,
  "velocity_max":100,
  "output_dir":"./output",
  "generate_json":true // Generate a JSON file containing a copy of the config when generating midi
}
```

## TODO
Change the way octaves work when generating notes
Cleanup
Abstract the midiwriter logic for more portability 