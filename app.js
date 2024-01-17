const bells1 = new Audio('call-to-attention-123107.mp3')
const bells2 = new Audio('ding-47489.mp3')

let workTitle = document.querySelector(".work")
let breakTitle = document.querySelector(".break")

let workTime = 25
let breakTime1 = 5
let breakTime2 = 15
let seconds = 59
let breaks = 0
let clicks = 1
let pomodoros = 1

let workMins = workTime - 1
let breakMins1 = breakTime1 - 1
let breakMins2 = breakTime2 - 1
workTitle.classList.add("active")
breakTitle.classList.remove("active")

function reset() {
    clearInterval(interval)
    seconds = "00"

    document.querySelector(".button").innerHTML = "Start"
    document.querySelector(".minutes").innerHTML = workTime
    document.querySelector(".seconds").innerHTML = seconds

    seconds = 59
    workMins = 24
    clicks = 1

    workTitle.classList.add("active")
    breakTitle.classList.remove("active")

    //reset pomodoros display
    pomodoros = 1
    breaks = 0
    document.querySelector(".periodDisplay").innerHTML = "Pomodoro #"
    document.querySelector(".periodNum").innerHTML = pomodoros
    breaks = 0
}

function count() {
    clicks++

    if (clicks % 2 === 0){
        let timerFunction = () => {

            //display
            document.querySelector(".minutes").innerHTML = workMins
            document.querySelector(".seconds").innerHTML = seconds
            document.querySelector(".button").innerHTML = "Pause"
    
            //decrement by 1 seconds
            seconds = seconds - 1
            
            //place 09-01 if less than 10
            if (seconds < 10){
                document.querySelector(".seconds").innerHTML = "0" + seconds
            }
    
            //decrease minutes and reset seconds
            if (seconds == 0){
                workMins = workMins - 1
                if (workMins === -1){
                    if (breaks === 0){
                        breaks++
                        workTitle.classList.remove("active")
                        breakTitle.classList.add("active")
                        workMins = breakMins1

                        //display breaks
                        document.querySelector(".periodDisplay").innerHTML = "Break #"
                        document.querySelector(".periodNum").innerHTML = breaks
                        bells2.play()
                    }
                    else if (breaks % 4 === 0){
                        breaks++
                        workTitle.classList.remove("active")
                        breakTitle.classList.add("active")
                        workMins = breakMins2
                        
                        //display breaks
                        document.querySelector(".periodDisplay").innerHTML = "Break #"
                        document.querySelector(".periodNum").innerHTML = breaks
                        bells2.play()
                    } else if (breaks % 2 === 0){
                        breaks++
                        workTitle.classList.remove("active")
                        breakTitle.classList.add("active")
                        workMins = breakMins1
                        
                        //display breaks
                        document.querySelector(".periodDisplay").innerHTML = "Break #"
                        document.querySelector(".periodNum").innerHTML = breaks
                        bells2.play()
                    } else {
                        workTitle.classList.add("active")
                        breakTitle.classList.remove("active")
                        workMins = workTime
                        pomodoros++
                        breaks++

                        //display pomodoros
                        document.querySelector(".periodDisplay").innerHTML = "Pomodoro #"
                        document.querySelector(".periodNum").innerHTML = pomodoros
                        bells1.play()
                    }
                }
                seconds = 59
            }
            
        }
        interval = setInterval(timerFunction, 1000)
    } else if (clicks % 2 === 1){
        clearInterval(interval)
        document.querySelector(".button").innerHTML = "continue"
    }
}

const inputBox = document.querySelector(".inputBox")
const listContainer = document.querySelector("#listContainer")

function save() {
    if (inputBox.value === ""){
        alert("You must write something before you can save it as a task!")
    } else{
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        listContainer.appendChild(li)

        //create x button
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    inputBox.value = ""
}

listContainer.addEventListener("click", function(list) {
    if (list.target.tagName === "LI") {
        list.target.classList.toggle("checked")
    } else if (list.target.tagName ===  "SPAN") {
        list.target.parentElement.remove()
    }
}, false)
