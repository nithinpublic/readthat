console.clear();


fetch("csv/curated_reads.json")
    .then(response => {
         if (response.ok) { 
            console.log("Success") 
        } else { 
            console.log("Fetch failed") 
        } 
    })
    .then(data => {
        console.log(data)
    })