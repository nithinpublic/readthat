//© Nithin Davis Nanthikkara

document.onload = fetch_and_fill_card();

function fetch_and_fill_card() {
    console.clear();
    console.log("Fetching")

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

}




function write_card(data) {

    //dev tool stuff  -----
    document.getElementById("dev-tool-clicker").addEventListener("click", function (event) {
        offset = offset - 1;
        write_card(data)
        console.log(offset)
    }, { once: true });



    console.log("writing card with the following data: ", data)
    index = day_of_the_year()
    document.getElementById("article-title").innerHTML = data[index].title;
    document.getElementById("article-description").innerHTML = data[index].description;

    if (data[index].image.startsWith("http", 0)) {


        imageURL = String("url(\"" + (data[index].image).toString() + "\")")
        gradientOverlay = "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%)"
        combinedImageGradientOverlay = String(gradientOverlay + "," + imageURL)
        document.getElementById("article-pic").style.backgroundImage = combinedImageGradientOverlay;

    } else {
        document.getElementById("article-pic").style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%), url('images/no_image.png')";
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
var offset = 213 // change this to const and put it inside the day_of_the_year function when removing the dev-tool-clicker





function day_of_the_year() {
    today = new Date()

    // this is to adjust to the fact that I'm starting this today (3 August 2024) hehe
    dayIntoYear = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000
    console.log(dayIntoYear)
    return dayIntoYear - offset;
}

function extractDomain(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?([^.\/]+\.[^.\/]+).*$/, "https://www.$1");
}


function setup_share_button(titleToShare, linkToShare){
    if (navigator.share) {
        const shareButton = document.getElementById('share-button');
        shareButton.addEventListener('click', async () => {
            try {
                // Use the Web Share API to trigger the native sharing dialog
                await navigator.share({
                    title: titleToShare,
                    text: 'Shared via https://www.readtoast.com',
                    url: linkToShare
                });
    
                console.log('Shared successfully');
            } catch (error) {
                console.error('Error sharing:', error.message);
            }
        });
    } else {
        console.warn('Web Share API not supported on this browser');
        //raise a toast with link copied to clipboard
    }

}




