var config = require("config");

module.exports = new function() {
    var _loaded;

    this.init = function() {
        _loaded = new Promise(function(resolve) {
            gapi.load("auth2", function() {
                gapi.auth2.init({
                    client_id: config.google.clientId + ".apps.googleusercontent.com",
                    cookiepolicy: "single_host_origin"
                });
                resolve();
            });
        });
    };

    this.getAuthInstance = function() {
        return _loaded.then(function() {
            return gapi.auth2.getAuthInstance();
        });
    };
};
