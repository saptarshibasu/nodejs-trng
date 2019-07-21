// Notes:
// 1. console.log() is synchronous
// 2. bind() return a function


let log = function(text) {
    console.log(text);
};

let i = 0;
log(`Proces starting: value of i: ${i}`);
i++;
log(`console.log() before setImmediate(): value of i: ${i}`);
setImmediate(log.bind(null, `Calling setImmediate(): value of i: ${i}`));
i++;
log(`console.log() before nextTick(): value of i: ${i}`);
process.nextTick(log.bind(null, `Calling nextTick: value of i: ${i}`));
i++;
log(`console.log() after nextTick(): value of i: ${i}`);


// Explanations:
// 1. All console.log() and increment operations will be executed first because the event loop will first complete the current operation first
// 2. nextTick() will ne executed second because nextTick is executed immediately after the current operation
// 3. setImmediate() will be executed last in the next iteration of the event loop after the poll phase of the event loop


//Output:
// Proces starting: value of i: 0
// console.log() before setImmediate(): value of i: 1
// console.log() before nextTick(): value of i: 2
// console.log() after nextTick(): value of i: 3
// Calling nextTick: value of i: 2
// Calling setImmediate(): value of i: 1