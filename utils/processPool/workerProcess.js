process.on('message', msg => {
    const job = require(msg.modulePath);
    let result = job.apply(null, msg.argArray);
    process.send({result});
});