const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const regexImageLink = /^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im;
const regexLink = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;

module.exports = {
  BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, regexImageLink, regexLink,
};
