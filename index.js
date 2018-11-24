
var gate = require("./gate.json");
var database = require("./database.json");

var db = {};
for (const key in gate) {
    if (database[key]) {
        db[key] = database[key];
    }
}

let filters = ["13003", "13004", "15008", "15010", "15011", "15012", "15014", "17116", "17122", "17126", "17134", "18002", "18003", "18004", "18005", "18006", "22002", "22003", "23002", "25002", "25003", "25004", "30002", "30003", "30004", "30005", "30006", "30008", "30009", "99998"]
let isInArray = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

let timeline = [];
let countsGate = [];
let countsDB = [];
let timeok = false;
for (const key in gate) {
    if (isInArray(filters, key) || !db[key]) {
        continue;
    }
    const arr = gate[key];
    for (let index = 0; index < arr.length; index++) {
        const el = arr[index];
        if (!timeok) {
            timeline.push(el.time);
        }
        if (index == arr.length - 1) {
            timeok = true
        }
        countsGate.push(el.count);
    }
    const arr2 = db[key];
    for (let index = 0; index < arr2.length; index++) {
        const el2 = arr2[index];
        countsDB.push(el2.count);
    }
    var canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 400;
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeline,
            datasets: [{
                label: "Gate " + key,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: countsGate,
                fill: false,
                pointRadius: 0,
            },
            {
                label: "DB " + key,
                backgroundColor: 'rgb(45, 143, 230)',
                borderColor: 'rgb(45, 143, 230)',
                data: countsDB,
                fill: false,
                pointRadius: 0,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    // type: "time",
                    distribution: 'linear',
                    ticks: {
                        source: 'labels'
                    }
                }]
            }
        }
    });
    document.getElementById("content").appendChild(canvas);
    countsGate = [];
    countsDB = [];
}

