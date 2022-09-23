const PORT = 8000

const express = require("express")
const cheerio = require("cheerio")
const axios = require("axios")
const cors = require("cors")
const app = express()
app.use(cors())
const musicTracks = []

const exploreUrl = "https://izimizik.com/explore"
let newArray = []

app.get("/ex", function(req, res){
    axios(exploreUrl)
    .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)
        $(".song-container", html ).each(function(){
            const title = $(this).find(".song-title").text().trim().trimStart()
            // console.log("Title: "+ title)
            const trkWebLink = $(this).find("a").attr("href")
            const image = $(this).find("img").attr("src")
           const addedDate = $(this).find(".timeago").text().trim()
            const trkUrl = $(this).find(".song-top").find(":nth-child(2)").data("track-url")
            const tag = $(this).find(".song-tag").text()
            console.log("tag:" + tag)
    // console.log("trk:" + $(this).find(".song-top").find(":nth-child(2)").data("track-url"))
            newArray.push({ title, trkUrl, trkWebLink, image, addedDate,tag})

        })
        res.json(newArray)
        // console.log(newArray)
        // console.log(newArray.length)
        // console.log($)
    }).catch(err => console.log(err))
})


// Fetch welcome page
// axios("https://izimizik.com/welcome")
// .then(response => {
//     const html = response.data
//     // console.log(html)
//     const $ = cheerio.load(html)
//     $(".welcome-items-width", html).each(function() {
//         const title = $(this).text().trim()
//        const trackWebLink = $(this).find("a").attr("href")
//        const trackUrl = $(this).find(".data-track-name")
//        const img = $(this).find("img").attr("src")
//        const alt = $(this).find("a").find("img").attr("src")
//         // const alt = $(this).find("a")
        
//        musicTracks.push({
//         title,
//         trackWebLink,
//         trackUrl,
//         img,
//         alt
//        })
//     })

//     console.log(musicTracks)
//     // content.innerHtml = musicTracks
// }).catch(err => console.log(err))



app.get("/", function(req, res){
    res.json("Web Scrapper")
})

app.get("/home", function(req, res){
    axios("https://izimizik.com/welcome")
.then(response => {
    const html = response.data
    // console.log(html)
    const $ = cheerio.load(html)
    $(".welcome-items-width", html).each(function() {
        const title = $(this).text().trim()
       const trackWebLink = $(this).find("a").attr("href")
       const trackUrl = $(this).find("div[.welcome-player-button]").val()
       const img = $(this).find("img").attr("src")
       const alt = $(this).find("img").attr("alt")
        // const alt = $(this).find("a")
        
       musicTracks.push({
        title,
        trackWebLink,
        trackUrl,
        img,
        alt
       })
    })

    res.json(musicTracks)
    // content.innerHtml = musicTracks
    // console.log(musicTracks.trackUrl)
}).catch(err => console.log(err))
})




app.listen(PORT, () =>{console.log(`Listening to PORT: ${PORT}`)})