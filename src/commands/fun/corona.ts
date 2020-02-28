import {Command} from '../../Command';
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html?fbclid=IwAR3W7PoYJBqBa44WcUtFONxzbpKP-CxDJdA6L8R6wy7iku9icM-1gnZ8mTM#/bda7594740fd40299423467b48e9ecf6';
// const url2 = 'https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6'

export const CoronaCount = new Command('CoronaCount', { 
    id: "corona",
    description: "scrapes a webpage for coronaviras statistics",
    aliases: ["corona", "kda"],
    examples: ["!corona"],
    run: async (msg: any, args: any) => {
        return puppeteer
          .launch()
          .then(function(browser: any) {
            return browser.newPage();
          })
          .then(function(page: any) {
            return page.goto(url,  {waitUntil: 'networkidle2'}).then(function() {
              return page.content();
            });
          })
          .then(function(html: any) {
            let initialText = $('.responsive-text-label', html).text().trim().split(' ');
            let separatedText: any[] = [];
            initialText.forEach((item: any) => {
                if(item != '' && item != '\n')
                    separatedText.push(item);
            });
        
            let formatedTextArray: any[] = [];
            separatedText.forEach(item => {
                if(item.includes('\n'))
                    item = item.slice(0, -1);
                formatedTextArray.push(item);
            });

            let deathsString = '';
            let recoveredString = '';
            let casesString = '';
            let lastUpdatedString = '';
        
            for(let i = 0; i < formatedTextArray.length; i++) {
                if(formatedTextArray[i] === 'Total' && formatedTextArray[i+1] === 'Deaths')
                    deathsString = 'Total Deaths: ' + formatedTextArray[i+2];
                else if(formatedTextArray[i] === 'Total' && formatedTextArray[i+1] === 'Confirmed')
                    casesString = 'Total Cases: ' + formatedTextArray[i+2];
                else if(formatedTextArray[i] === 'Total' && formatedTextArray[i+1] === 'Recovered')
                    recoveredString = 'Total Recovered: ' + formatedTextArray[i+2];
                else if(formatedTextArray[i] === '(M/D/YYYY)')
                    lastUpdatedString = 'Last Updated: ' + formatedTextArray[i+1] + ' ' + formatedTextArray[i+2] + ' ' + formatedTextArray[i+3] + ' EST';
            }
        
            return (`Corona Count: ${casesString}, ${recoveredString}, ${deathsString}, ${lastUpdatedString}`);
          })
          .catch(function(err: any) {
            //handle error
            return ('whoops they changed the page a lot')
          });
    }
});

