console.clear();



fetch("csv/monday_list.json")
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

    if (data[index].image.startsWith("http",0)) {


        imageURL = String("url(\"" + (data[index].image).toString() + "\")")
        gradientOverlay = "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%)"
        combinedImageGradientOverlay = String(gradientOverlay+","+imageURL)
        document.getElementById("article-pic").style.backgroundImage = combinedImageGradientOverlay;
        
    }

    if (data[index].sourcelogo.startsWith("http",0)) {


        sourceLogoURL = String("url(\"" + (data[index].sourcelogo).toString() + "\")")
        document.getElementById("article-source-icon").style.backgroundImage = sourceLogoURL;
        
        
    }

    document.getElementById("article-source-name").innerHTML = extractDomain(data[index].link)

    console.log(day_of_the_year())
}

function day_of_the_year() {
    today = new Date()

    const offset = 216 // this is to adjust to the fact that I'm starting this today (3 August 2024) hehe

    dayIntoYear = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000
    return dayIntoYear - offset;
}

function extractDomain(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?([^.\/]+\.[^.\/]+).*$/, "https://www.$1");
  }

