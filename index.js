// https://cloud.google.com/storage/docs/naming#requirements
const validBucketCharacters = /([a-z]|[0-9]|-|_|\.)*/;
const minBucketLength = 3;
const maxBucketLength = 63
const minObjectLength = 1;
const maxObjectLength = 1024;
const ipNotation = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
const googleSpellings = [
  "google", "g00gle", "g0ogle", "go0gle", "goog1e", "g00g1e", "g0og1e", "go0g1e"
];

module.exports = {
  validateBucket(bucket) {
    if (!bucket) {return false;}
    if (typeof bucket !== "string") {return false;}

    if (bucket.length < minBucketLength) {return false;}
    if (bucket.length > maxBucketLength) {return false;}

    if (bucket.match(validBucketCharacters)[0] !== bucket) {return false;}

    if (!bucket.match(/^[0-9a-z]/)) {return false;}
    if (!bucket.match(/[0-9a-z]$/)) {return false;}

    if (bucket.match(ipNotation)) {return false;}

    if (bucket.startsWith("goog")) {return false;}

    if (googleSpellings.some(google=>bucket.includes(google))) {return false;}

    return true;
  },

  validateObject(object) {
    if (!object) {return false;}

    if (object.length < minObjectLength) {return false;}
    if (object.length > maxObjectLength) {return false;}

    if (object.includes("\n")) {return false;}

    return true;
  },

  validateFilepath(filepath) {
    let bucket = null;
    let object = null;

    if (typeof filepath === "object") {
      bucket = filepath.bucket;
      object = filepath.object;
    } else {
      if (typeof filepath !== "string") {return false;}
      if (!filepath.includes("/")) {return false;}
      bucket = filepath.split("/")[0];
      object = filepath.split("/").slice(1).join("/");
    }

    if (!bucket || !object) {return false;}

    return module.exports.validateObject(object) &&
      module.exports.validateBucket(bucket);
  }
};
