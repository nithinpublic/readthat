console.clear();

//fetch stuff: https://www.youtube.com/watch?v=cuEtnrL9-H0

fetch("csv/curated_reads.json")
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

function write_card(data){
    console.log("writing card", data)
    index = 1
    document.getElementById("article-title").innerHTML = data[index].title;
    document.getElementById("article-description").innerHTML = data[index].description;
}