var request = require('request');

var theguardian = {
  listArticles: function(searchTerm) {
    var apiKey = process.env.theguardian_search_key;
    return new Promise(function(resolve, reject) {
      request.get({
        url: 'http://content.guardianapis.com/search?q=' + searchTerm + '&api-key=' + apiKey
      }, function (err, response, body) {
        body = JSON.parse(body);
        var articles = body.response.results;
        var formattedArticles = articles.map(function(article) {
          var publicationDate = article.webPublicationDate.substring(0, 10);
          return {
            title: article.webTitle,
            publicationDate: publicationDate,
            linkToArticle: article.webUrl
          };
        });
        resolve(formattedArticles);
      })
    });
  }
};

module.exports = theguardian;
