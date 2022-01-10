const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const modes = {
  major: [0,2,4,5,7,9,11],
  minor: [0,2,3,5,7,8,10],
  chromatic: [0,1,2,3,4,5,6,7,8,9,10,11]
};


// const durationsHuman = {
//   eight: 't1024',
//   four: 't512',
//   two: 't256',
//   whole: '1',
//   half:'2',
//   dottedHalf: 'd2',
//   doubleDottedHalf: 'dd2',
//   quarter: '4',
//   quarterTriplet: '4t',
//   dottedQuarter: 'd4',
//   doubleDottedQuarter: 'dd4',
//   eighth: '8',
//   eighthTriplet: '8t',
//   dottedEighth: 'd8',
//   doubleDottedEighth: 'dd8',
//   sixteenth: '16',
//   sixteenthTriplet: '16t',
//   thirtySecond: '32',
//   sixtyFourth: '64',
// };

const durations = [
  't1024',
  't512',
  't256',
  '1',
  '2',
  'd2',
  'dd2',
  '4',
  '4t',
  'd4',
  'dd4',
  '8',
  '8t',
  'd8',
  'dd8',
  '16',
  '16t',
  '32',
  '64',
];

const octaves = [0,1,2,3,4,5,6,7,8,9,10];

module.exports = {
  notes,
  modes,
  octaves,
  durations
};