"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var Hour = function Hour(_ref) {
  var disabled = _ref.disabled,
    onChange = _ref.onChange,
    value = _ref.value;
  var buildOptions = (0, _react.useMemo)(function () {
    var options = [];
    for (var i = 0; i < 24; i++) {
      options.push( /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
        key: i,
        id: i,
        value: i
      }, (i < 10 ? "0" : "") + i));
    }
    return options;
  }, []);
  return /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    variant: "standard",
    sx: {
      m: 1,
      minWidth: 80
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    disabled: disabled === true ? true : false,
    onChange: onChange ? onChange : function () {},
    value: Number(value)
  }, buildOptions));
};
var _default = Hour;
exports.default = _default;