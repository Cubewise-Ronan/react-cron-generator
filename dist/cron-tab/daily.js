"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _minutesSelect = _interopRequireDefault(require("../minutes-select"));
var _hourSelect = _interopRequireDefault(require("../hour-select"));
var _FrontHourText = _interopRequireDefault(require("../components/Text/FrontHourText"));
var _EveryText = _interopRequireDefault(require("../components/Text/EveryText"));
var _meta = require("../meta");
var _material = require("@mui/material");
/* eslint-disable react/no-direct-mutation-state */

var SECTION = {
  EVERY: "every",
  EVERY_WEEKDAY: "weekday"
};
var DailyCron = function DailyCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var _useState = (0, _react.useState)(value[3] === "?" ? SECTION.EVERY_WEEKDAY : SECTION.EVERY),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    section = _useState2[0],
    setSection = _useState2[1];
  var onDayChange = function onDayChange(e) {
    if (!e.target.value || e.target.value > 0 && e.target.value < 32) {
      value = ["0", getValueByIndex(1), getValueByIndex(2), "*", "*", "?", "*"];
      onValueChange(3, e.target.value ? "1/".concat(e.target.value) : e.target.value);
    }
  };

  /**
   * If value is * return 0 else return value
   * @param {position in array} index
   */
  var getValueByIndex = function getValueByIndex(index) {
    return value[index] === "*" ? "0" : value[index];
  };
  var onAtHourChange = function onAtHourChange(e) {
    onValueChange(2, e.target.value);
  };
  var onAtMinuteChange = function onAtMinuteChange(e) {
    onValueChange(1, e.target.value);
  };
  var onValueChange = function onValueChange(cronPosition, _value) {
    var val = value;
    val[cronPosition] = _value;
    onChange(val);
  };
  var handleChange = function handleChange(e) {
    setSection(e.target.value);
    if (e.target.value === SECTION.EVERY_WEEKDAY) {
      onChange(["0", value[1], value[2], "?", "*", "MON-FRI", "*"]);
    } else {
      onChange(_meta.INITIAL_VALUES[_meta.HEADER_VALUES.DAILY]);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.FormControl, null, /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    value: section,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: SECTION.EVERY,
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Every"), " "), /*#__PURE__*/_react.default.createElement(_material.TextField, {
      label: "",
      disabled: section !== SECTION.EVERY,
      type: "number",
      InputLabelProps: {
        shrink: true
      },
      variant: "standard",
      onChange: onDayChange,
      value: value[3].split("/")[1] ? value[3].split("/")[1] : ""
    }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("day(s)"), " "))
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: SECTION.EVERY_WEEKDAY,
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Every week day"), " "))
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_FrontHourText.default, null, translate("Start time")), /*#__PURE__*/_react.default.createElement(_hourSelect.default, {
    onChange: onAtHourChange,
    value: value[2]
  }), /*#__PURE__*/_react.default.createElement(_minutesSelect.default, {
    onChange: onAtMinuteChange,
    value: value[1]
  })));
};
var _default = DailyCron;
exports.default = _default;