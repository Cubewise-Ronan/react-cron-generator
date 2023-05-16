"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _EveryText = _interopRequireDefault(require("../components/Text/EveryText"));
var _material = require("@mui/material");
var HourlyCron = function HourlyCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var onHourChange = function onHourChange(e) {
    if (e.target.value > 0 && e.target.value < 24 || e.target.value === "") {
      var val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = value[1];
      val[2] = e.target.value ? "0/".concat(e.target.value) : e.target.value;
      val[3] = "1/1";
      onChange(val);
    }
  };
  var onMinuteChange = function onMinuteChange(e) {
    if (e.target.value > 0 && e.target.value < 60 || e.target.value === "") {
      var val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = e.target.value;
      val[2] = value[2];
      val[3] = "1/1";
      onChange(val);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Every"), " "), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "",
    type: "number",
    InputLabelProps: {
      shrink: true
    },
    variant: "standard",
    onChange: onHourChange,
    value: value[2].split("/")[1] ? value[2].split("/")[1] : ""
  }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("hour")), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "",
    type: "number",
    InputLabelProps: {
      shrink: true
    },
    variant: "standard",
    onChange: onMinuteChange,
    value: value[1]
  }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("minutes(s)")));
};
var _default = HourlyCron;
exports.default = _default;