
const noop = () => {};
const NO_PARAMS = {}

// eslint-disable-next-line no-unused-vars
function request({
    method = 'GET',
    url,
    params = NO_PARAMS,
    type = 'json',
    checkStatusInResponse = false,
    onSuccess = noop,
    onError = noop
}) {
    const req = new XMLHttpRequest();

    const urlParams = new URLSearchParams(params);
    const queryString = urlParams.toString();

    req.open(method, url + (queryString ? `?${queryString}` : ''));
    req.responseType = type;

    req.onload = function (event) {
        const target = event.target;

        if (target.status !== 200) {
            onError(target.statusText);

            return;
        }

        if (checkStatusInResponse && target.response.status !== 'ok') {
            onError(target.statusText);

            return;
        }

        onSuccess(target.response);
    }

    req.onerror = function () {
        onError();
    }

    req.send();
}

 