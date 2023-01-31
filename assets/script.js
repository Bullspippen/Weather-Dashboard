/* HTML ELEMENT INTERACTIONS

Require the following
Input element for searching, search button (addeventlistener)
When the button is clicked, the search values that are displayed based on the input

Forecast Section

document.getElementById("forecast")

Divs, class "card" within forecast section
.querySelectorAll(".card")

Loop through each of the "card" for 5 day forecast

let forecast = [day1, day2, day3, day4, day5]
for(let i = 0; i < forecast.length; i++){
let currentDay = forecast[i]
let forecastDay = document.getElementById(`forecast-day${i+1}`);

include card-title, card-text
}




 let currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);
  let main = $("#main")
  let hour = dayjs().get('hour')

  let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

  function workDayScheduler(){
    for(let i = 0; i < workHours.length; i++){
      console.log(hour)
      let saveinput = localStorage.getItem(`${i}`)w]