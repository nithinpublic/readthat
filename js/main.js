//© Nithin Davis Nanthikkara

document.onload = populate_card();

function populate_card() {
    console.clear();

    //File paths for different days lists
    const monday_list = "json/monday_list.json"
    const tuesday_list = "json/tuesday_list.json"
    const wednesday_list = "json/wednesday_list.json"
    const thursday_list = "json/thursday_list.json"
    const friday_list = "json/friday_list.json"
    const saturday_list = "json/saturday_list.json"
    const sunday_list = "json/sunday_list.json"

    //Select list based on the day of the week.
    switch (new Date().getDay()) {
        case 0:
            console.log("Its a Sunday");
            fetch_and_write(sunday_list)
            break;
        case 1:
            console.log("Its a Monday");
            fetch_and_write(monday_list)
            break;
        case 2:
            console.log("Its a Tuesday");
            fetch_and_write(tuesday_list)
            break;
        case 3:
            console.log("Its a Wednesday");
            fetch_and_write(wednesday_list)
            break;
        case 4:
            console.log("Its a Thursday");
            fetch_and_write(thursday_list)
            break;
        case 5:
            console.log("Its a Friday");
            fetch_and_write(friday_list)
            break;
        case 6:
            console.log("Its a Saturday");
            fetch_and_write(saturday_list)
            break;

    }



}

function fetch_and_write(jsonFilePath){
    console.log("Fetching data from,",jsonFilePath,"...")
    fetch(jsonFilePath)
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
}



function write_card(data) {

    //dev tool stuff  -----
    document.getElementById("dev-tool-clicker").addEventListener("click", function (event) {
        offset = offset - 7;
        write_card(data)
        console.log(offset)
    }, { once: true });



    console.log("writing card with the following data: ", data)
    index = week_of_the_year(222);
    console.log("Writing card with data index = ", index)
    document.getElementById("article-title").innerHTML = data[index].title;
    document.getElementById("article-description").innerHTML = data[index].description;

    if (data[index].image.startsWith("http", 0)) {


        imageURL = String("url(\"" + (data[index].image).toString() + "\")")
        gradientOverlay = "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0) 100%)"
        combinedImageGradientOverlay = String(gradientOverlay + "," + imageURL)
        document.getElementById("article-pic").style.backgroundImage = combinedImageGradientOverlay;

    } else {
        document.getElementById("article-pic").style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0) 100%), url('images/no_image.webp')";
    }

    if (data[index].sourcelogo.startsWith("http", 0)) {


        sourceLogoURL = String("url(\"" + (data[index].sourcelogo).toString() + "\")")
        document.getElementById("article-source-icon").style.backgroundImage = sourceLogoURL;


    } else {
        document.getElementById("article-source-icon").style.backgroundImage = "url(images/globe_icon.png)";
    }

    document.getElementById("article-source-name").innerHTML = extractDomain(data[index].link)

    //document.getElementById("clickable-area").setAttribute("onclick","location.href='www.yahoo.com';")
    document.getElementById("clickable-area").addEventListener("click", function (event) {
        document.location = data[index].link;
    })

    setup_share_button(data[index].title, data[index].link);

}

var offset = 222;



function week_of_the_year(fromThisDay = 0) {

    fromThisDay = offset; // dev tool - delete later


    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var dayOfYear = Math.abs(Math.floor(diff / oneDay) - fromThisDay);
    console.log('Day of year: ' + dayOfYear);

    //calculate week of the year
    var weekOfYear = Math.floor(dayOfYear * (52 / 365));
    console.log("Week of the year with DST: " + (weekOfYear));

    return weekOfYear;
}

function extractDomain(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?([^.\/]+\.[^.\/]+).*$/, "https://www.$1");
}


function setup_share_button(titleToShare, linkToShare) {
    if (navigator.share) {
        const shareButton = document.getElementById('share-button');
        shareButton.addEventListener('click', async () => {
            try {
                // Use the Web Share API to trigger the native sharing dialog
                await navigator.share({
                    title: titleToShare,
                    text: 'This article was featured on Readpghds',
                    url: linkToShare
                });

                console.log('Shared successfully');
            } catch (error) {
                console.error('Error sharing:', error.message);
            }
        });
    } else {
        console.warn('Web Share API not supported on this browser');
        //change icon to copy-icon and raise a toast with link copied to clipboard on clicking
    }

}




/* Deleted stuff....
function day_of_the_year(offset = 0) {
    today = new Date();

    // the offset is to adjust to the fact that I'm starting this today (3 August 2024) hehe
    dayIntoYear = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    console.log(dayIntoYear);

    return dayIntoYear - offset;

}

*/