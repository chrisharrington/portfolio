var Promise = require("es6-promise").Promise,
    query = require("querystring");

module.exports = {
    get: function(url, params) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url + "?" + query.stringify(params));

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200)
                        resolve(JSON.parse(xhr.responseText));
                    else
                        reject({ status: xhr.status, response: xhr.responseText });
                }
            };

            xhr.send(null);
        });
    },

    post: function(url, params) {
        return new Promise(function(resolve, reject) {
            params = query.stringify(params);

            var http = new XMLHttpRequest();
            http.open("POST", url, true);

            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader("Content-length", params.length);
            http.setRequestHeader("Connection", "close");

            http.onreadystatechange = function() {
                if (http.readyState === 4) {
                    if (http.status === 200)
                        resolve(JSON.parse(http.responseText));
                    else
                        reject({ status: xhr.status, });
                }
            }
            http.send(params);
        });
    }
};
