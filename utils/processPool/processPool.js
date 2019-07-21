const winston = require('winston');
const fork = require('child_process').fork;

const ProcessPool = function (maxSize, maxWaiting) {
    this.maxSize = maxSize;
    this.maxWaiting = maxWaiting;
    this.active = [];
    this.idle = [];
    this.waiting = []
}

ProcessPool.prototype.getProcess = function (callback) {
    if (this.idle.length <= 0 && // No worker is idle
        this.active.length >= this.maxSize && // All workers are busy
        this.waiting.length >= this.maxWaiting) { // Maximum number of waiting requests reached

        winston.info('Waiting list reached max size');
        process.nextTick(callback.bind(null,
            new Error(`Maximum number of waiting requests (${this.waiting.length}) reached`),
            null));
    }

    if (this.idle.length <= 0 && // No worker is idle
        this.active.length >= this.maxSize && // All workers are busy
        this.waiting.length < this.maxWaiting) { // Maximum number of waiting requests not yet reached

        winston.info('Queuing to waiting list');
        this.waiting.push(callback);
    }

    if (this.idle.length > 0) { // idle process available
        let workerProcess = this.idle.pop();
        winston.info(`Returning process id: ${workerProcess.pid}`);
        process.nextTick(callback.bind(null, null, workerProcess));
    }

    if (this.idle.length <= 0 && // No worker is idle
        this.active.length < this.maxSize) { // Maximum pool size has not reached

        let workerProcess = fork('./workerProcess.js');
        winston.info(`Forked new process id: ${workerProcess.pid}`)
        this.active.push(workerProcess);
        process.nextTick(callback.bind(null, null, workerProcess));
    }
}

ProcessPool.prototype.releaseProcess = function (workerProcess) {
    winston.info(`Releasing process: ${workerProcess.pid}`)
    if (this.waiting.length > 0) {
        process.nextTick(this.waiting.pop().bind(null, null, workerProcess));
    } else {
        this.active = this.active.filter(wp => wp.pid !== workerProcess.pid);
        this.idle.push(workerProcess);
    }
}

ProcessPool.prototype.disconnect = function () {
    this.idle.concat(this.active).forEach((wp) => {
        winston.info(`Disconnecting ${wp.pid}`)
        wp.disconnect();
    });
}

module.exports = ProcessPool;


