const { Worker, isMainThread }  = require('worker_threads');
const axios = require("axios");
const cheerio = require("cheerio");
const chalk = require("chalk")

/*if(isMainThread){
    new Worker(__filename);
} else{
    console.log("Worker says: Hello World"); // prints 'Worker says: Hello World'
}*/

/*request("https://www.parrot-media.de/", (error, response, html) => {
    if(!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const siteHeading = $("h1");
        console.log(siteHeading.html())
        console.log(siteHeading.text())
    }
})*/

axios.get("https://casinowitch.com/").then((res) => {
    if(res.status === 200) {
        const html = res.data
        const $ = cheerio.load(html);

        $("a").each((i, el) => {
            let item = $(el).text();
            const link = $(el).attr("href");
            if(item.length === 0) {
                item = "IMAGE"
                console.log(i, chalk.red(item) + " Link to: " + link)
            } else {
                console.log(i, chalk.bold.green(item) + " Link to: " + link)
            }
            //console.log(i, chalk.bold.green(item) + " Link to: " + link)
        })
    }

}).catch(e => {
    console.log(e)
})