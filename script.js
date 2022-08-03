let nowDate = new Date(),
    nowDateNumber = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nowYear = nowDate.getFullYear(),
    container = document.getElementById('calendar'),
    monthContainer = container.getElementsByClassName('month-name')[0],
    yearContainer = container.getElementsByClassName('year-name')[0],
    daysContainer = container.getElementsByClassName('days')[0],
    prev = container.getElementsByClassName('prev')[0],
    next = container.getElementsByClassName('next')[0],
    monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


let curDate = nowDate.setMonth(nowDate.getMonth() - 1);

function setMonthCalendar(year, month) {
    let monthDays = new Date(year, month + 1, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
        monthDaysText = '';
    monthContainer.textContent = monthName[month];
    yearContainer.textContent = year;
    daysContainer.innerHTML = '';

    if (monthPrefix > 0) {
        for (let i = 1; i <= monthPrefix; i++) {
            monthDaysText += '<li></li>';
        }
    }

    for (let i = 1; i <= monthDays; i++) {
        monthDaysText += '<li class="day">' + i + '</li>';
    }

    daysContainer.innerHTML = monthDaysText;

    if (month == nowMonth && year == nowYear) {
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
    }
}

setMonthCalendar(nowYear, nowMonth);


function removeClass(id) {
    let element = document.getElementById(id);
    element.classList.remove('d-none');
}

function addClass(id) {
    let element = document.getElementById(id);
    element.classList.add('d-none');
}

function selectDay() {
    document.addEventListener("click", function (e) {
        if (e.target.className == "day" || e.target.className == "day date-now") {
            e.target.classList.toggle("selected");
            removeClass('container');
        }
        else if (e.target.className == "day selected" || e.target.className == "day date-now selected") {
            e.target.classList.toggle("selected");
            addClass('container');
        }
    });
}

selectDay()

prev.onclick = function () {
    let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() - 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();

    setMonthCalendar(curYear, curMonth);
    selectDay();
}

next.onclick = function () {
    let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() + 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();

    setMonthCalendar(curYear, curMonth);
    selectDay();
}


// Добавление заметок

const button = document.querySelector('button');
let notes = [];

document.addEventListener("DOMContentLoaded", function (event) {
    let lastNotes = localStorage.getItem('notes');
    if (lastNotes != null) {
        const arr = JSON.parse(lastNotes);
        const filterArr = arr.filter(el => el !== null);
        let lastNotesString = "";
        for (let elem of filterArr) {
            lastNotesString += elem;
        }
        document.getElementById('note').innerHTML = lastNotesString;
        notes.push(lastNotesString);
    }
});

function getNote() {
    let time = document.querySelector('input').value;
    console.log(time);
    let text = document.querySelector('textarea').value;
    if (text != '') {
        const note = `<div class="timenote">${time}</div>` + text;
        const result = `<div class="col">${note}</div>`;
        return result;
    } else {
        return alert("Пустая заметка!");
    }
}

function commentOutput() {
    notes.push(getNote());
    localStorage.setItem('notes', JSON.stringify(notes));
    notes = JSON.parse(localStorage.getItem('notes'));
    const filterNotes = notes.filter(el => el !== null);
    let notesString = "";
    for (let note of filterNotes) {
        notesString += note;
    }
    document.getElementById('note').innerHTML = notesString;
}
button.addEventListener("click", commentOutput);