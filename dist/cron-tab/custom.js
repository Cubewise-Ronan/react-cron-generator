"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var CustomCron = function CustomCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var onChangeHandle = function onChangeHandle(e) {
    onChange(e.target.value.replace(/,/g, "!").split(" "));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "well"
  }, translate("Expression"), " ", /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "",
    variant: "standard",
    onChange: onChangeHandle,
    value: value.toString().replace(/,/g, " ").replace(/!/g, ",")
  }));
};
var _default = CustomCron;
exports.default = _default;