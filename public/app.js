    const btn = document.querySelector(".btn-container")
    let btnLetter = document.querySelector(".btn")
    const dayContainer = document.querySelector(".day-container")
    const timeLocationContainer = document.querySelector(".time-location-container")
    const quoteContainer = document.querySelector(".quote-container")
    const arrow = document.querySelector(".arrow")
    let time = document.querySelector(".time")
    const icon = document.querySelector(".icon")
    const greeting = document.querySelector(".greeting")
    const html = document.querySelector(".html")
    const flex1 = document.querySelector(".flex-1")
    const flex2 = document.querySelector(".flex-2")
    let quote = document.querySelector(".quote")
    let author = document.querySelector(".author")
    const resetQuote = document.querySelector(".reset-quote")
    let locationUnderTime = document.querySelector(".location")
    let dayContainerLocation = document.querySelector(".day-container-location")
    let dayOfYear = document.querySelector(".day-of-year")
    let dayOfWeek = document.querySelector(".day-of-week")
    let weekNumber = document.querySelector(".week-number")

    
    function fetchApi () {
        fetch("/api", {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
                 "Accept" : "application/json"
            },
        }).then(res => res.json()).then(data => {
             console.log(data)
            let quoteData = data[1]
      })
    }


    //Click Btn 

    btn.addEventListener("click", ()=>{
        dayContainer.classList.toggle("day-container-active");
        timeLocationContainer.classList.toggle("time-location-container-active");
        quoteContainer.classList.toggle("quote-container-active")
        
        
        if(dayContainer.classList.contains("day-container-active")){
            btnLetter.textContent = "LESS"
            arrow.classList.add("arrow-active")
            
        }else {
            btnLetter.textContent = "MORE" 
            arrow.classList.remove("arrow-active")
        }
    })

// UPDATE TIME 
    function updateTime () {
        const d = new Date();
        const hour = d.getHours()
        const minitues = d.getMinutes()

        if (minitues >= 0 && minitues < 10) {
            time.textContent = `${hour}:0${minitues}`
        }else {
            time.textContent = `${hour}:${minitues}`
        }

        if(hour >= 5 && hour <= 11) {
            greeting.textContent = "Good Morning, It's Currently" 
        } else if (hour >= 12 && hour <= 17) {
            greeting.textContent = "Good Afternoon, It's Currently"
        } else {
            greeting.textContent = "Good Evening, It's Currently"
        }

        if (hour >= 5 && hour <= 17) {
            html.classList.remove("background-active")
            dayContainer.classList.remove("background-day-container-active")
            flex1.classList.remove("day-container-letter-color-active")
            flex2.classList.remove("day-container-letter-color-active")
            icon.classList.add("fa-sun")
            icon.classList.remove("fa-moon")
        }else {
            html.classList.add("background-active")
            dayContainer.classList.add("background-day-container-active")
            flex1.classList.add("day-container-letter-color-active")
            flex2.classList.add("day-container-letter-color-active")
            icon.classList.add("fa-moon")
            icon.classList.remove("fa-sun")
        }

    }

    setInterval(updateTime, 1000)

    // UPDATE QUOTE

    function updateQuote () {
        fetch("/api", {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
                 "Accept" : "application/json"
            },
        }).then(res => res.json()).then(data => {
             console.log(data)
            let quoteData = data[2]
            quote.textContent = quoteData.en
            author.textContent = quoteData.author
      })
    }   

    resetQuote.addEventListener("click", updateQuote)

    // Update Day Container and Location 

    function updateLocation () {
        fetch("/api", {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
                 "Accept" : "application/json"
            },
        }).then(res => res.json()).then(data => {
             let dateData = data[0]
            dayOfWeek.textContent = dateData.day_of_week
            dayOfYear.textContent = dateData.day_of_year
            weekNumber.textContent = dateData.week_number
            dayContainerLocation.textContent = dateData.timezone
            locationUnderTime.textContent = dateData.timezone
      })
    }
    updateLocation()





