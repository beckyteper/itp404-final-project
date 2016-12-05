var request = require('request');

var wallstreetjournal = {
  listArticles: function(searchTerm) {
    var apiKey = process.env.newsapi_key;
    return new Promise(function(resolve, reject) {
      request.get({
        url: 'https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=' + apiKey
      }, function(err, response, body) {
        body = JSON.parse(body);
        var articles = body.articles;
        var formattedArticles = articles.map(function(article) {
          if (article.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return {
              title: article.title,
              author: article.author,
              linkToArticle: article.url,
              publishedAt: article.publishedAt
            };
          };
        });
        resolve(formattedArticles);
      })
    });
  }
};

module.exports = wallstreetjournal;
