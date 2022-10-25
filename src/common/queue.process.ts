/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Job } from "bull";
import { Process } from '@nestjs/bull';

export abstract class BaseProcessor {
    @Process()
    async process(job: Job) {
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