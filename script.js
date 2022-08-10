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

prev.onclick = function () {
    let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() - 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();

    setMonthCalendar(curYear, curMonth);
    daysContainer.addEventListener("click", selectDay);
}

next.onclick = function () {
    let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() + 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();

    setMonthCalendar(curYear, curMonth);
    daysContainer.addEventListener("click", selectDay);
}
// Выбор дня

function removeClass(id) {
    let element = document.getElementById(id);
    element.classList.remove('d-none');
}

function addClass(id) {
    let element = document.getElementById(id);
    element.classList.add('d-none');
}


/*function selectDay() {
    let selectedDay = document.querySelectorAll('day');
    console.log(selectedDay);
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
}*/
let date;
function selectDay(event) {

    if (event.target.className == "day" || event.target.className == "day date-now") {
        event.target.classList.toggle("selected");
        removeClass('container');
    }
    else if (event.target.className == "day selected" || event.target.className == "day date-now selected") {
        event.target.classList.toggle("selected");
        addClass('container');
    }
    if (document.querySelectorAll('selected')) {
        daysContainer.removeEventListener("click", selectDay);
    }
    date = event.target.innerHTML + monthContainer.innerHTML + yearContainer.innerHTML;
    return date;
}

daysContainer.addEventListener("click", selectDay);


// Добавление заметок

const button = document.querySelector('button');
let notes = [];
let textarea = document.querySelector('textarea');
let timeInput = document.querySelector('input[type="time"]');

document.addEventListener("click", function (event) {
    let lastNotes = localStorage.getItem(`${date}`);
    if (lastNotes != null) {
        const arr = JSON.parse(lastNotes);
        const filterArr = arr.filter(el => el !== null);
        let lastNotesString = "";
        for (let elem of filterArr) {
            lastNotesString += elem.note;
            notes.push(elem);
        }
        document.getElementById('note').innerHTML = lastNotesString;
    }
});

function getNote() {

    let time = document.querySelector('input').value;

    let text = document.querySelector('textarea').value;

    if (text != '' && time != '') {
        const note = `<div class="timenote" id="${time}"> ${time}</div>` + text;
        const result = `<div class="col"> ${note}</div> `;
        let noteObject = {
            time: time,
            note: result,
            completed: '',
        }
        return noteObject;
    } else {
        if (time == '') return alert("Не выбрано время!");
        if (text == '') return alert("Пустая заметка!");
    }

}

function addNote() {
    notes.push(getNote());
    localStorage.setItem(`${date}`, JSON.stringify(notes));
    notes = JSON.parse(localStorage.getItem(`${date}`));
    const filterNotes = notes.filter(el => el !== null);
    let notesString = "";
    for (let note of filterNotes) {
        notesString += note.note;
    }
    document.getElementById('note').innerHTML = notesString;
}


//проверить
/*
function hideConteiner(elem, class1, class2) {
    let elem = document.querySelector('selected')
    if (elem.className == class1 || elem.className == class2) {
        elem.classList.toggle("selected");
        addClass('container');
    }
}

hideConteiner(elem, "day selected", "day date-now selected");
*/

button.addEventListener("click", addNote);