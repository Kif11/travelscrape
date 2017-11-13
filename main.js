const rp = require('request-promise');
const cheerio = require('cheerio');

function parseHtml(url) {
  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  return new Promise((resolve, reject) => {
    rp(options).then(($) => {
      resolve($);
    }).catch((err) => {
      reject(err)
    });
  });
}

// Craigslist ride share
parseHtml('https://miami.craigslist.org/d/rideshare/search/mdc/rid').then($ => {
  $('p.result-info').each((i, el) => {
    let time = $(el).children('time.result-date').attr('datetime');
    let title = $(el).children('a').text();
    let link = $(el).children('a').attr('href');
    if(i < 5) {
      console.log('🚗 ', title, link);
    }
  });;
});

// Cruisers forum
parseHtml('http://www.cruisersforum.com/forums/f30/?pp=25&sort=dateline&order=desc&daysprune=-1&prefixid=Wanted').then($ => {
  $('[id^=thread_title_]').each((i, el) => {
    if(i < 5) {
      console.log('🛳 ',$(el).text());
    }
  });
});