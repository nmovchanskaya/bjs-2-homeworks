class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId;
    }

    addClock (time, func, id) {
        if (id == null || id == undefined) {
            throw new Error('error text');
        }
        if (this.alarmCollection.find((item) => item.id === id)) {
            console.error('id is not unique');
            return;
        }
        this.alarmCollection.push({id: id, time: time, func: func});
    }

    removeClock (id) {
        this.alarmCollection = this.alarmCollection.filter((item) => item.id !== id);
    }

    getCurrentFormattedTime() {
        let date = new Date();
        return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    }

    checkClock(alarm) {
        if (this.getCurrentFormattedTime() === alarm.time) {
            alarm.func();
        }
    }

    start() {
        if (this.timerId === null || this.timerId === undefined) {           

            this.timerId = setInterval(() => this.alarmCollection.forEach((alarm) => this.checkClock(alarm)), 60000);
        }
    }

    stop() {
        if (this.timerId) { 
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        this.alarmCollection.forEach((item) => console.log("id: " + item.id + ", time: " + item.time));
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

clock = new AlarmClock();
console.log(clock);
clock.addClock(
    "21:55", 
    () => console.log("Time to get up!"), 
    1);
clock.addClock(
    "21:56", 
    () =>  {console.log("Hey! Let's get up!"); 
            clock.removeClock(2)}, 
    2);
clock.addClock(
    "21:57", 
    () =>   {console.log("You really need to get up!!!"); 
            clock.clearAlarms(); 
            clock.printAlarms()}, 
    3);

clock.printAlarms();
clock.start();
