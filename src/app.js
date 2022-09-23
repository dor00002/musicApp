const content = document.querySelector(".content")

fetch("http://localhost:8000/ex")
.then(res =>res.json())
.then(data => {
    console.log(data)
    data.forEach(music => {
        // let title =`<h2>`+ music.title+ `</h2>` 
        // let a = `p` + music.tracckWeblink + `p`
        let musicItem = `<div class="singleMusic">
        <img src=${music.image} />
        
        <a href= ${music.trkWebLink}><h2>${music.title}</h2></a>
        <a href=${music.trkUrl}>download</a>
        <a href= "" class="musicTag">${music.tag}</a>
        
        </div>` 
        // let {b, c, d} = music
        // content.append(b, c, d)
        content.insertAdjacentHTML("afterend", musicItem)
        // console.log(title)
    });
   
})
.catch(err => console.log(err))