import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { BaseQueueProcess } from "./base.process"


export class ToppingService extends BaseQueueProcess {
    processes = [];
    constructor(
        @InjectQueue('topping-1') private topping_1: Queue,
        @InjectQueue('topping-2') private topping_2: Queue,
        @InjectQueue('topping-3') private topping_3: Queue

    ) {
        super('topping', 3, 2, [topping_1, topping_2, topping_3]);
    }
}