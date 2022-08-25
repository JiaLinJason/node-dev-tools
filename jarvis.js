const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const jsonClone = (obj) => JSON.parse(JSON.stringify(obj));
const deepClone = function (obj) {
    if (Array.isArray(obj)) {
        let newArr = []
        for (let i = 0; i < obj.length; i++) {
            newArr.push(deepClone(obj[i]))
        }
        return newArr;
    } else if (typeof obj === 'object') {
        let newObj = {}
        for (let key in obj) {
            newObj[key] = deepClone(obj[key]);
        }
        return newObj;
    } else {
        return obj;
    }
}
const random = (min = 0, max = 1) => parseInt(Math.random() * (max - min + 1) + min);
const unique = (arr = []) => Array.from(new Set(arr));
const parseTimespan = function (mills) {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const days = parseInt(mills / (1000 * 60 * 60 * 24));
    const hours = parseInt((mills % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = parseInt((mills % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = ((mills % (1000 * 60)) / 1000).toFixed(1);

    switch (true) {
        case mills < SECOND:
            return mills % 100 + ' ms';
        case mills < MINUTE:
            return seconds + ' s';
        case mills < HOUR:
            return minutes + " min" + seconds + ' s';
        case mills < DAY:
            return hours + " hours" + minutes + " min" + seconds + ' s';
        default:
            return days + ' days' + hours + " hours" + minutes + " min";
    }
}
const printPercent = function (current = 1, total = 1, options = {}) {
    if (typeof current !== 'number' || typeof total !== 'number') {
        throw new TypeError("wrong type of current or total, expect number");
    }
    const startTime = options.startTime || 0;
    const printPercent = options.printPercent === undefined ? true : options.printPercent;
    const bar = printPercent ? `${(current / total * 100).toFixed(2)}%` : `${current}/${total}`;
    const timeUsed = startTime ? `used: ${parseTimespan(Date.now() - startTime)}` : "";
    const msg = `${bar} ${timeUsed}`;
    process.stdout.clearLine()
    process.stdout.moveCursor(0 - msg.length, 0)
    process.stdout.write(msg);
}
const enableOriginFormat = function () {
    Date.prototype.format = function (fmt = "") {
        const o = {
            "M+": this.getMonth() + 1,
            "D+": this.getDate(),
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        const yearResult = fmt.match(/(Y+)/);
        if (yearResult && yearResult.length > 0) {
            fmt = fmt.replace(yearResult[0], (this.getFullYear() + "").substring(4 - yearResult[0].length));
        }

        for (const k in o) {
            const restResult = fmt.match(new RegExp("(" + k + ")"));
            if (restResult && restResult.length > 0) {
                fmt = fmt.replace(restResult[0], (restResult[0].length == 1) ? (o[k]) : (("00" + o[k]).substring(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}
const outputExcel = function (path, data) {
    const fs = require('fs')
    const xlsx = require('node-xlsx');
    // should install this package first

    const buffer = xlsx.build([
        {
            name: 'sheet1',
            data: data
        }
    ]);
    fs.writeFileSync(path, buffer);
}
const readExcel = (path) => {
    const xlsx = require('node-xlsx');
    return xlsx.parse(path)[0].data;
};

const safeFind = (obj, target) => {
    if (typeof target !== 'string') {
        throw new TypeError("wrong type of param target, expect string");
    }
    if (target[0] === ".") { target = target.slice(1, target.length); }
    const path = target.split(".");
    let res = obj;
    for (let i = 0; i < path.length; i++) {
        res = res[path[i]]
        if (res === undefined) return undefined;
    }
    return res;
}

module.exports = {
    sleep,
    jsonClone,
    deepClone,
    random,
    unique,
    parseTimespan,
    printPercent,
    enableOriginFormat,
    outputExcel,
    readExcel,
    safeFind
}