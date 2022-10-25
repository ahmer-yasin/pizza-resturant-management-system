/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InjectQueue, OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Queue, Job } from "bull";
import { BaseQueueProcess } from "./base.process";
import { BaseProcessor } from './queue.process';
import { Processor, Process } from '@nestjs/bull';



export class DoughService extends BaseQueueProcess {
    processes = [];
    constructor(
        @InjectQueue('dough-1') private dough_1: Queue,
        @InjectQueue('dough-2') private dough_2: Queue
    ) {
        super('dough', 7, 1, [dough_1, dough_2]);
    }
}

@Processor('dough-1')
export class Dough_1Consumer extends BaseProcessor {
    constructor(private doughService: DoughService){
        super();
    }
    @OnQueueCompleted()
    onComplete(job: Job) {
        console.log(
            `Complete job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
        this.doughService.onComplete(job);
    }
}


@Processor('dough-2')
export class Dough_2Consumer {
    @Process()
    async processDough(job: Job) {
        try {
            console.log(job.data);
        } catch (error) {
            console.log(error);
        }
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @OnQueueCompleted()
    onComplete(job: Job) {
        console.log(
            `Complete job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }


}