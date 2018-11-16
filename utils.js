const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('log_20181115_all.txt'),
    crlfDelay: Infinity
});

var obj = {};

rl.on('line', (line) => {
    let array = line.toString().split("\t");
    let time = array[1];
    let count = array[2];
    let app = array[0];
    if (app.toString() != "0") {
        if (!obj[app]) {
            let ar = [];
            ar.push({ time: time, count: count });
            obj[app] = ar;
        } else {
            obj[app].push({ time: time, count: count });
        }
    }
});

rl.on("close", () => {
    fs.writeFile("./gate.json", JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log("write ok");
    })
})

const rl2 = readline.createInterface({
    input: fs.createReadStream('onlinelog_20181115_all.txt'),
    crlfDelay: Infinity
});

var obj2 = {};

rl2.on('line', (line) => {
    let array = line.toString().split("\t");
    let time = array[1];
    let count = array[2];
    let app = array[0];
    if (app.toString() != "0") {
        if (!obj2[app]) {
            let ar = [];
            ar.push({ time: time, count: count });
            obj2[app] = ar;
        } else {
            obj2[app].push({ time: time, count: count });
        }
    }
});

rl2.on("close", () => {
    fs.writeFile("./database.json", JSON.stringify(obj2), (err) => {
        if (err) throw err;
        console.log("write ok");
    })
})

