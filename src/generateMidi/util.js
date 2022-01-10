module.exports = {
  weightArr,
  weightObj
  //randomNumber
}

function weightArr(original, weights){
  let newArr = [];
  for(let [index,weight] of Object(weights).entries()){
    for(let i = 0; i < weight; i++){
      newArr.push(original[index]);
    }
  }
  return newArr;
}

function weightObj(original, weights){
  // original is an array
  // weights is an object with keys matching original values
 let newArr = [];
 for(let item of original){
   for(let i = 0; i < weights[item]; i++){
     newArr.push(item);
   }
 }
  return newArr;
}

// function randomNumber(min, max){
//   const r = Math.random()*(max-min) + min
//   return Math.floor(r)
// }