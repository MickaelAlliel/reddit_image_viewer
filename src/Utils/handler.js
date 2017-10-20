var config = require('../config');

var request = (options, callback) => {
  const https = require('https');

  /*
  * options = {
  * hostname (reddit.com)
  * port (http = 80, https = 443)
  * path (/r/photoshopbattles/hot.json?sort=new)
  * method (GET / POST)
  * }
  */

  var body = '';

  const req = https.request(options, (result) => {
    result.on('data', (data) => {
      body += data;
    });

    result.on('end', () => {
      callback(false, body);
    });
  });

  req.on('error', (err) => {
    callback(err, null);
  });

  req.end();
};


var getPosts = (subreddit, after, before, callback) => {
  let urls = require('../Resources/urls');
  var types = require('../Resources/types');

  let path = urls.reddit.api.subreddit + subreddit + urls.reddit.api.json;
  
  if (after !== null && after !== '')
    path += urls.reddit.api.after + types.prefix.link + after;
  else if (before !== null && before !== '')
    path += urls.reddit.api.before + types.prefix.link + before;

  let options = {
    hostname: urls.reddit.api.base,
    port: 443,
    path: path,
    method: 'GET',
    json: true
  };

  request(options, (error, data) => {
    callback(error, data);
  });
};

var getComments = (subreddit, listing_id, after, before, callback) => {
  let urls = require('../Resources/urls');
  var types = require('../Resources/types');

  let path = urls.reddit.api.subreddit + subreddit + urls.reddit.api.comments + listing_id + urls.reddit.api.json;
  
  if (after !== null && after !== '')
    path += urls.reddit.api.after + types.prefix.comment + after;
  else if (before !== null && before !== '')
    path += urls.reddit.api.before + types.prefix.comment + before;

  console.log(path);

  let options = {
    hostname: urls.reddit.api.base,
    port: 443,
    path: path,
    method: 'GET',
    json: true
  };

  request(options, (error, data) => {
    callback(error, data);
  });
};

var getImgurAlbumImages = (albumHash, callback) => {
  let urls = require('../Resources/urls');
  let options = {
    hostname: urls.imgur.api.base,
    port: 443,
    path: urls.imgur.api.album + albumHash + urls.imgur.api.images,
    method: 'GET',
    headers: {
      'Authorization': config.imgur.client_id,
    },
    json: true
  };

  request(options, (error, data) => {
    callback(error, data);
  });
};

var getImgurGalleryAlbum = (galleryHash, callback) => {
  let urls = require('../Resources/urls');
  let options = {
    hostname: urls.imgur.api.base,
    port: 443,
    path: urls.imgur.api.galleryAlbum + galleryHash + urls.imgur.api.images,
    method: 'GET',
    headers: {
      'Authorization': config.imgur.client_id,
    },
    json: true
  };

  request(options, (error, data) => {
    callback(error, data);
  });
};

var getImgurImage = (imgurHash, callback) => {
  let urls = require('../Resources/urls');
  let options = {
    hostname: urls.imgur.api.base,
    port: 443,
    path: urls.imgur.api.image + imgurHash,
    method: 'GET',
    headers: {
      'Authorization': config.imgur.client_id,
    },
    json: true
  };

  request(options, (error, data) => {
    callback(error, data);
  });
};


module.exports = {
  //We dont want to access the request directly from outside this wrapper
  //request: request,
  getPosts: getPosts,
  getComments: getComments,
  getImgurAlbumImages: getImgurAlbumImages,
  getImgurImage: getImgurImage,
  getImgurGalleryAlbum: getImgurGalleryAlbum,
};
