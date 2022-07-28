const calendar = document.querySelector("#calendar");

const getDayName = day => {

    const date = new Date(2018, 0, day);

    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

}

for (let day = 1; day <= 31; day++) {

    let name = "";
    if (day <= 7) {
        const dayName = getDayName(day);
        name = `<div class = "name">${dayName}</div>`;
    }


    calendar.insertAdjacentHTML("beforeend", `<div class="day">${name}${day}</div>`);
}

document.querySelectorAll("#calendar .day").forEach(day => {
    day.addEventListener("click", event => {
        event.currentTarget.classList.toggle("selected");
    });
});

