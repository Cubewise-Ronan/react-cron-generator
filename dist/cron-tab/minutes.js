"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _EveryText = _interopRequireDefault(require("../components/Text/EveryText"));
var MinutesCron = function MinutesCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var onChangeHandle = function onChangeHandle(e) {
    if (e.target.value > 0 && e.target.value < 60 || e.target.value === "") {
      var val = ["0", "*", "*", "*", "*", "?", "*"];
      val[1] = e.target.value ? "0/".concat(e.target.value) : val[1];
      onChange(val);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Every")), " ", /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "",
    type: "number",
    InputLabelProps: {
      shrink: true
    },
    variant: "standard",
    onChange: onChangeHandle,
    value: value && value.length > 1 ? value[1].split("/")[1] : value,
    min: 1,
    max: 60
  }), " ", /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("minute(s)")));
};
var _default = MinutesCron;
exports.default = _default;