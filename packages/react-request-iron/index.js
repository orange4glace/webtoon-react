'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestContext = exports.Get = exports.Request = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _request = require('./request.js');

Object.defineProperty(exports, 'Request', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_request).default;
    }
});

var _requestContext = require('./request-context.js');

Object.defineProperty(exports, 'RequestContext', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_requestContext).default;
    }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _request2 = require('./request');

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrap(wrapProps) {
    return function (props) {
        var pass = _extends({}, props, wrapProps);
        return _react2.default.createElement(
            _request3.default,
            pass,
            props.children
        );
    };
}

var Get = wrap({
    method: 'get'
});
exports.Get = Get;