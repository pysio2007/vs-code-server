"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayify = exports.getOptions = exports.resolveBase = exports.trimSlashes = exports.normalize = exports.generateUuid = exports.plural = exports.split = void 0;
var logger_1 = require("@coder/logger");
/**
 * Split a string up to the delimiter. If the delimiter doesn't exist the first
 * item will have all the text and the second item will be an empty string.
 */
exports.split = function (str, delimiter) {
    var index = str.indexOf(delimiter);
    return index !== -1 ? [str.substring(0, index).trim(), str.substring(index + 1)] : [str, ""];
};
/**
 * Appends an 's' to the provided string if count is greater than one;
 * otherwise the string is returned
 */
exports.plural = function (count, str) { return (count === 1 ? str : str + "s"); };
exports.generateUuid = function (length) {
    if (length === void 0) { length = 24; }
    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array(length)
        .fill(1)
        .map(function () { return possible[Math.floor(Math.random() * possible.length)]; })
        .join("");
};
/**
 * Remove extra slashes in a URL.
 */
exports.normalize = function (url, keepTrailing) {
    if (keepTrailing === void 0) { keepTrailing = false; }
    return url.replace(/\/\/+/g, "/").replace(/\/+$/, keepTrailing ? "/" : "");
};
/**
 * Remove leading and trailing slashes.
 */
exports.trimSlashes = function (url) {
    return url.replace(/^\/+|\/+$/g, "");
};
/**
 * Resolve a relative base against the window location. This is used for
 * anything that doesn't work with a relative path.
 */
exports.resolveBase = function (base) {
    // After resolving the base will either start with / or be an empty string.
    if (!base || base.startsWith("/")) {
        return base !== null && base !== void 0 ? base : "";
    }
    var parts = location.pathname.split("/");
    parts[parts.length - 1] = base;
    var url = new URL(location.origin + "/" + parts.join("/"));
    return exports.normalize(url.pathname);
};
/**
 * Get options embedded in the HTML or query params.
 */
exports.getOptions = function () {
    var options;
    try {
        options = JSON.parse(document.getElementById("coder-options").getAttribute("data-settings"));
    }
    catch (error) {
        options = {};
    }
    var params = new URLSearchParams(location.search);
    var queryOpts = params.get("options");
    if (queryOpts) {
        options = __assign(__assign({}, options), JSON.parse(queryOpts));
    }
    logger_1.logger.level = options.logLevel;
    options.base = exports.resolveBase(options.base);
    options.csStaticBase = exports.resolveBase(options.csStaticBase);
    logger_1.logger.debug("got options", logger_1.field("options", options));
    return options;
};
/**
 * Wrap the value in an array if it's not already an array. If the value is
 * undefined return an empty array.
 */
exports.arrayify = function (value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === "undefined") {
        return [];
    }
    return [value];
};
//# sourceMappingURL=util.js.map