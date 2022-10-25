/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Job, Queue } from "bull";


export abstract class BaseQueueProcess {
    // start_time: Date; // start time of new process
    // end_time: Date; // end_time time of new process
    queue_name: string;  // queue name
    duration: number; // number of seconds for the process
    process_allowed: number; // number of processed allowed
    abstract processes = [];
    nextIndex = 0;

    // construtor
    constructor(name: string, duration: number, process: number, public queueServices: Queue[]) {
        // this.start_time = new Date();
        this.queue_name = name;
        this.duration = duration;
        this.process_allowed = process;
    }

    getServiceName() {
        return this.queue_name;
    }

    endService() {
        // this.end_time = new Date();
        this.logTime();
    }

    logTime() {
        // console.log(this.start_time, this.end_time);
    }

    add(item) {
        this.processes.unshift(item);
        this.next();
    }

    next() {
        // if(this.queueServices[this.nextIndex].inprocess) {
        //     return;
        // }
        this.queueServices[this.nextIndex].add({ seconds: this.duration, item: this.processes.pop() });
        this.nextIndex++;
        this.nextIndex = this.nextIndex % this.queueServices.length;
    }

    onComplete(job: Job) {
        console.log(job);
        this.next();
        const index =  this.processes.findIndex((item)=> item.id == job.data.id);

    }
}
