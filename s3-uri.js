var _ = require('underscore');
var c = require('rho-contracts-fork');
var s3BucketName = require('rho-cc-s3-bucket-name');
var url = require('url');

module.exports = c.pred(function (value) {
    if (! _(value).isString()) {
        return false;
    }

    var parsed = url.parse(value);

    var disallowedKeys = ['auth', 'port', 'search', 'query', 'hash'];
    var isPresent = function (key) { return parsed[key] !== null; };
    if (_(disallowedKeys).any(isPresent)) {
        return false;
    }

    if (parsed.protocol !== 's3:') {
        return false;
    }

    try {
        s3BucketName.check(parsed.host);
    } catch (e) {
        return false;
    }

    return true;
}).rename('s3Uri');
