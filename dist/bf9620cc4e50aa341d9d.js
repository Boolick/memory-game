/* eslint-disable no-unused-vars */
var noop = function noop() {};
var NO_PARAMS = {};
function request(_ref) {
    var _ref$method = _ref.method,
        method = _ref$method === void 0 ? "GET" : _ref$method,
        url = _ref.url,
        _ref$params = _ref.params,
        params = _ref$params === void 0 ? NO_PARAMS : _ref$params,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? "json" : _ref$type,
        _ref$checkStatusInRes = _ref.checkStatusInResponse,
        checkStatusInResponse =
            _ref$checkStatusInRes === void 0 ? false : _ref$checkStatusInRes,
        _ref$onSuccess = _ref.onSuccess,
        onSuccess = _ref$onSuccess === void 0 ? noop : _ref$onSuccess,
        _ref$onError = _ref.onError,
        onError = _ref$onError === void 0 ? noop : _ref$onError;
    var req = new XMLHttpRequest();
    var urlParams = new URLSearchParams(params);
    var queryString = urlParams.toString();
    req.open(method, url + (queryString ? "?".concat(queryString) : ""));
    req.responseType = type;
    req.onload = function (event) {
        var target = event.target;
        if (target.status !== 200) {
            onError(target.statusText);
            return;
        }
        if (checkStatusInResponse && target.response.status !== "ok") {
            onError(target.statusText);
            return;
        }
        onSuccess(target.response);
    };
    req.onerror = function () {
        onError();
    };
    req.send();
}
