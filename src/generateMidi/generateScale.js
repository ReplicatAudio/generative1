const {notes, modes} = require('./data');
module.exports = (mode, key)=>{
  const intervals = modes[mode];
  const tonicIndex = notes.indexOf(key); 
  let scale = [];
  for(let interval of intervals){
    const note = notes[(tonicIndex+interval) % notes.length];
    scale.push(note);
  }
  return scale;
}