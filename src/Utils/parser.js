var Handler = require('./handler');
var queryString = require('query-string');

var parseLinkType = (link) => {
  //  check if link is a direct link
  let regexpDirect = /i.imgur.com/;
  let matchDirect = regexpDirect.exec(link);

  if (matchDirect !== null) {
    return 'direct';
  }

  //---------------------------------------

  //  check if link is an album
  let regexpAlbum = /imgur.com\/a\//;
  let matchAlbum = regexpAlbum.exec(link);

  if (matchAlbum !== null) {
    return 'album';
  }

  //---------------------------------------

  //  check if link is a gallery link
  let regexpGallery = /imgur.com\/gallery\//;
  let matchGallery = regexpGallery.exec(link);

  if (matchGallery !== null) {
    return 'gallery';
  }
  

  //---------------------------------------

  // Order is important - if checked before gallery it will think this is a gallery
  //  check if link is an imgur link
  let regexpImgur = /https:\/\/imgur.com\/?/;
  let matchImgur = regexpImgur.exec(link);

  if (matchImgur !== null) {
    return 'imgur';
  }

  //---------------------------------------

  return 'undefined';
};

var parseImageLink = (body_html, callback) => {
  let regexp = /href="(.*?)"/;
  let match = regexp.exec(body_html);

  let link = null;

  if (match !== null)
    link = match[1];

  if (link) {
    // Force https
    if (!link.includes('https')) {
      link = link.replace('http', 'https');
    }
    // Check here if link is an album, an imgur link or direct link image
    switch (parseLinkType(link)) {
      case 'album':
        retrieveImageFromAlbum(link, (albumImageLink) => {
          callback(albumImageLink);
        });
        break;
      case 'imgur':
        callback(retrieveImageFromImgur(link));
        break;
      case 'gallery':
        retrieveImageFromGallery(link, (galleryImageLink) => {
          callback(galleryImageLink);
        });
        break;
      case 'direct':
        callback(link);
        break;
      default:
        callback(link);
        break;
    }
  }

  return '';
};

var parseImageTitle = (body) => {
  let regexp = /\[(.*?)\]/;
  let match = regexp.exec(body);

  let title = null;

  if (match !== null)
    title = match[1];

  if (title) {
    return title;
  }

  return 'untitled';
  
};

var retrieveImageFromAlbum = (albumLink, callback) => {
  let link = albumLink;
  let albumHash = link.split('/');
  albumHash = albumHash[albumHash.length - 1];

  Handler.getImgurAlbumImages(albumHash, (error, data) => {
    if (error)
      callback(error);
    else {
      let json = JSON.parse(data);
      if (json.data) {
        callback(json.data[0].link);
      } else {
        callback('undefined');
      }
    }
  });
};

var retrieveImageFromGallery = (galleryLink, callback) => {
  let link = galleryLink;
  let galleryHash = link.split('/');
  galleryHash = galleryHash[galleryHash.length - 1];

  Handler.getImgurGalleryAlbum(galleryHash, (error, data) => {
    if (error)
      callback(error);
    else {
      let json = JSON.parse(data);
      if (json.data) {
        callback(json.data[0].link);
      } else {
        callback('undefined');
      }
    }
  });
};


var retrieveImageFromImgur = (imgurLink) => {
  return imgurLink + '.jpg';
};

var getParameters = (url) => {
  return queryString.parse(url);
}

module.exports = {
  parseImageLink: parseImageLink,
  parseImageTitle: parseImageTitle,
  getParameters: getParameters,
};