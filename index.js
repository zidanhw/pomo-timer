const notifier = require('node-notifier');
const moment = require('moment');
const argTime = process.argv.slice(2);

const POMODORO_DURATION = argTime[0];
const BREAK_DURATION = argTime[1];

let isWorking = false;
let remainingTime = 0;

function formatTime(totalSecond) {
    const duration = moment.duration(totalSecond, 'seconds');
    const hours = duration.hours().toString().padStart(2,'0');
    const minutes = duration.minutes().toString().padStart(2,'0');
    const seconds = duration.seconds().toString().padStart(2,'0');

    return `${hours}:${minutes}:${seconds}`;
}

function startTimer(duration) {
    isWorking = !isWorking;
    remainingTime = duration*60;

    const timer = setInterval(()=> {
        remainingTime--
        
        const formattedTime = formatTime(remainingTime);

        if (isWorking === true) {
            console.log(`Work: ${formattedTime}`);
        } else {
            console.log(`Break: ${formattedTime}`);
        }

        if (remainingTime == 0) {
            clearInterval(timer);
            notifier.notify({
                title: isWorking ? 'Break Time' : 'Good Work',
                message : isWorking ? 'Good Break' : 'Good Work',
                sound : true,
                wait : true
            })
            if (isWorking === true) {
                startTimer(BREAK_DURATION);
            } else {
                startTimer(POMODORO_DURATION);
            }
        
        }
    }, 1000);
}
console.log('POMOTIMER START');
startTimer(POMODORO_DURATION);