'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _requestContext = require('./request-context');

var _requestContext2 = _interopRequireDefault(_requestContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function RequestSuccess(props) {
    if (typeof props.children == 'function') return props.children(props);
    var child = _react2.default.Children.only(props.children);
    return _react2.default.cloneElement(child, props);
}

function RequestCatch(props) {
    if (typeof props.children == 'function') return props.children(props);
    var child = _react2.default.Children.only(props.children);
    return _react2.default.cloneElement(child, props);
}

function RequestFetching(props) {
    if (typeof props.children == 'function') return props.children(props);
    var child = _react2.default.Children.only(props.children);
    return _react2.default.cloneElement(child, props);
}

var RequestInner = function (_React$Component) {
    _inherits(RequestInner, _React$Component);

    function RequestInner(props) {
        _classCallCheck(this, RequestInner);

        var _this = _possibleConstructorReturn(this, (RequestInner.__proto__ || Object.getPrototypeOf(RequestInner)).call(this, props));

        _this.state = {
            state: 'none',
            request: null,
            cancel: null,
            response: null,
            error: null
        };
        return _this;
    }

    _createClass(RequestInner, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (!this.props.requestContext.mock) {
                var cancel = _axios2.default.CancelToken.source();
                var req = (0, _axios2.default)(_extends({}, this.props.config, {
                    cancelToken: cancel.token
                })).then(function (response) {
                    _this2.setState({
                        state: 'done',
                        response: response
                    });
                }).catch(function (err) {
                    _this2.setState({
                        state: 'catch',
                        error: err
                    });
                });
                this.setState({
                    state: 'load',
                    request: req,
                    cancel: cancel.cancel
                });
            } else {
                var tl = setTimeout(function () {
                    if (Math.random() > _this2.props.requestContext.mockFail) {
                        _this2.setState({
                            state: 'done',
                            response: {
                                data: _this2.props.mock()
                            }
                        });
                    } else {
                        _this2.setState({
                            state: 'catch',
                            error: 'mock-err'
                        });
                    }
                }, this.props.requestContext.mockDelay);
                this.setState({
                    state: 'load',
                    request: tl,
                    cancel: function cancel() {
                        clearTimeout(tl);
                    }
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.cancel) this.state.cancel();
        }
    }, {
        key: 'render',
        value: function render() {
            var acceptType = void 0;
            var children = this.props.children;
            var childProps = {
                response: this.state.response,
                error: this.state.error,
                loading: this.state.state == 'load'
            };
            if (typeof children == 'function') return children(childProps);
            var child = _react2.default.Children.only(children);
            return _react2.default.cloneElement(child, childProps);
        }
    }]);

    return RequestInner;
}(_react2.default.Component);

RequestInner.propTypes = {
    config: _propTypes2.default.object,
    mock: _propTypes2.default.func
};


var Request = function Request(props) {
    return _react2.default.createElement(
        _requestContext2.default.Consumer,
        null,
        function (context) {
            return _react2.default.createElement(RequestInner, _extends({}, props, { requestContext: context }));
        }
    );
};

Request.Success = RequestSuccess;
Request.Catch = RequestCatch;
Request.Fetch = RequestFetching;

exports.default = Request;