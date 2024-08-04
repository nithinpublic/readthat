console.clear();



fetch("csv/monday_list_computers.json")
    .then(response => {
        if (response.ok) {
            console.log("Success")
            return response.json()


        } else {
            console.log("Fetch failed")
            return response.json()
        }
    })
    .then(data => {
        write_card(data)
    })

function write_card(data) {
    console.log("writing card", data)
    index = day_of_the_year()
    document.getElementById("article-title").innerHTML = data[index].title;
    document.getElementById("article-description").innerHTML = data[index].description;

    if (data[index].image != "#N/A") {


        imageURL = String("url(\"" + (data[index].image).toString() + "\")")
        gradientOverlay = "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%)"
        combinedImageGradientOverlay = String(gradientOverlay+","+imageURL)
        document.getElementById("article-pic").style.backgroundImage = combinedImageGradientOverlay;
        
        //document.getElementById("article-pic").style.background = linear-gradient(to bottom, #000000 1%,#303030 10%);
    }

    console.log(day_of_the_year())
}

function day_of_the_year() {
    today = new Date()

    const offset = 217 // this is to adjust to the fact that I'm starting this today (3 August 2024) hehe

    dayIntoYear = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000
    return dayIntoYear - offset;
}

