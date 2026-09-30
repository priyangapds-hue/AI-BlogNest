const sanitizeHtml = require("sanitize-html");

function clean(value = "") {
  return sanitizeHtml(String(value), {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();
}

module.exports = { clean };
