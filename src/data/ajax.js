export default new function() {
    this.get = function(url, params, contentType) {
        return fetch(`${url}${buildQuery(params)}`, {
            method: "GET",
            headers: { "Content-Type": contentType || "application/json" },
        });
    };

    this.post = function(url, params, contentType) {
        return fetch(url, {
            method: "POST",
            headers: { "Content-Type": contentType || "application/json" },
            body: JSON.stringify(params)
        });
    };

    function buildQuery(params) {
        var query = "";
        for (var name in params)
            query += `&${name}=${params[name] ? encodeURIComponent(params[name]) : ""}`;
        return query ? `?${query.substring(1)}` : query;
    }
};
