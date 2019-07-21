const winston = require('winston');
const ProcessPool = require('./processPool');

winston.configure({ transports: [new winston.transports.Console({ format: winston.format.simple() })] });

let processPool = new ProcessPool(2, 10);

for (let i = 0; i < 10; i++) {
    processPool.getProcess((err, wp) => {
        if (err) {
            return winston.error(err);
        }

        wp.once('message', msg => {
            winston.info(`PP: Result is: ${msg.result}`);
            processPool.releaseProcess(wp);
        });

        wp.send({
            'modulePath': './addition.js',
            'argArray': [1, 2]
        });
    });
}

setTimeout(() => {processPool.disconnect()}, 2000);