class Scheduler {
    constructor(limit) {
        this.queue = [];
        this.maxCount = limit;
        this.runCounts = 0;
    }

    add(promiseCreator) {
        promiseCreator = promiseCreator || function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        };

        this.queue.push(promiseCreator);
        this.request();
    }

    request() {
        if (!this.queue.length || this.runCounts >= this.maxCount) {
            return;
        }
        this.runCounts++;
        // 拿出第一个任务异步执行
        this.queue.shift()().then(() => {
            this.runCounts--;
            this.request(); // 执行下一个异步任务
        });
    }
}