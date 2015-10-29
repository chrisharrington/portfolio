module.exports = {
    init: function() {
        String.prototype.pad = function(length, char) {
            char = char || "0";

            var value = this;
            while (value.length < length)
                value = char + value;

            return value;
        }
    }
}
