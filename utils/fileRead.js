const Promise = require('bluebird');
// Removing the boilerplate code to create promise manually
const fs = Promise.promisifyAll(require('fs'));

// Note the async keyword. The function has to be async to use await
const getData = async () => {
    try {
        console.log(
            JSON.parse(
                // The function with the Async suffix is the wrapper function created by bluebird
                // The suffix can be configured to be different
                // The await makes the asynchronous code look synchronous
                await fs.readFileAsync('../resources/posts.json')
            )
        );
    } catch (err) {
        console.log(err);
    }
};

getData();

// Output:
// <File content>