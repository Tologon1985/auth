// function gooseFilter (birds) {
//     let geese = ["African", "Roman Tufted", "Toulouse", "Pilgrim", "Steinbacher"]
//     return birds.filter(item=> !geese.includes(item))
// }
//
// console.log(gooseFilter(["Mallard", "Hook Bill", "African", "Crested", "Pilgrim", "Toulouse", "Blue Swedish"]))

function cycle(dir, arr, cur) {
    let indexOfCur = arr.indexOf(cur);
    return indexOfCur < 0 ?
        null :
        arr[(indexOfCur + dir + arr.length) % arr.length];
}

console.log( cycle(-1, [1,2,3], 1))