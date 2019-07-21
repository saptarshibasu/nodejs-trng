const Batching = function() {
    this.inProgress = [];
}

Batching.prototype.getData = function(data, callback) {

    // No racing condition here although it is writing to the instance variable without synchronization
    // All the user code are going to be executed by a single threaded event loop
    this.inProgress.push(callback);

    // Execute the expensive operation only if there is no other queued / inprogress request
    // Otherwise, if there is a queued request just exit. The callback is already registered
    // The callback will be invoked once the inprogress operation is complete
    if(this.inProgress.length <=1) {
        expensiveOperation(data, (result) => {
            // invoke all the queued callbacks one after the other with the result
            this.inProgress.forEach((data, index) => {
                // setImmediate is safe most of the time
                // as it would interleave the concurrent I/O before executing the passed function
                setImmediate(this.inProgress.pop().bind(null, result));
            });
        });
    }
}

// Simulated toy expensive operation
const expensiveOperation = (data, callback) => { 
    setTimeout(() => {
        console.log('Expensive operation performed');
        setImmediate(callback.bind(null, data * 10));
    }, 2000);
}


let batching = new Batching();
// Client repeatedly calling expensive operation
// But due to batching the expensive operation will be executed only once
for(let i=1; i<=5; i++) {
    batching.getData(i, (result) => {
        console.log(result);
    });
}

// Output:
// Expensive operation performed
// 10
// 10
// 10