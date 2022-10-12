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
var _material = require("@mui/material");
/* eslint-disable react/no-direct-mutation-state */

var MonthlyCron = function MonthlyCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    every = _useState2[0],
    setEvery = _useState2[1];
  (0, _react.useEffect)(function () {
    if (value[3] === "L") {
      setEvery("2");
    } else if (value[3] === "LW") {
      setEvery("3");
    } else if (value[3].startsWith("L")) {
      setEvery("4");
    } else {
      setEvery("1");
    }
  }, [value]);
  var onDayChange = function onDayChange(e) {
    if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31 || e.target.value === "") {
      var val = ["0", value[1] === "*" ? "0" : value[1], value[2] === "*" ? "0" : value[2], value[3], "1/1", "?", "*"];
      val[3] = "".concat(e.target.value);
      onChange(val);
    }
  };
  var onLastDayChange = function onLastDayChange(e) {
    if (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31 || e.target.value === "") {
      var val = ["0", value[1] === "*" ? "0" : value[1], value[2] === "*" ? "0" : value[2], value[3], "1/1", "?", "*"];
      if (e.target.value === "") {
        val[3] = "";
      } else {
        val[3] = "L-".concat(e.target.value);
      }
      onChange(val);
    }
  };
  var onAtHourChange = function onAtHourChange(e) {
    var val = value;
    val[2] = "".concat(e.target.value);
    onChange(val);
  };
  var onAtMinuteChange = function onAtMinuteChange(e) {
    var val = value;
    val[1] = "".concat(e.target.value);
    onChange(val);
  };
  var handleChange = function handleChange(e) {
    setEvery(e.target.value);
    var input = ["0", value[1] === "*" ? "0" : value[1], value[2] === "*" ? "0" : value[2], "L-".concat(1), "*", "?", "*"];
    if (e.target.value === "1") {
      input = ["0", value[1] === "*" ? "0" : value[1], value[2] === "*" ? "0" : value[2], "1", "1/1", "?", "*"];
    } else if (e.target.value === "2") {
      input = ["0", value[1] === "*" ? "0" : value[1], value[2] === "*" ? "0" : value[2], "L", "*", "?", "*"];
    } else if (e.target.value === "3") {
      input = ["0", value[1] === "*" ? "0" : value[1], value[2] === "*" ? "0" : value[2], "LW", "*", "?", "*"];
    }
    onChange(input);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.FormControl, null, /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    value: every,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "1",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Day"), " "), /*#__PURE__*/_react.default.createElement(_material.TextField, {
      label: "",
      disabled: every !== "1",
      type: "number",
      InputLabelProps: {
        shrink: true
      },
      variant: "standard",
      onChange: onDayChange,
      value: value[3]
    }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("of every month(s)"), " "))
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "2",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Last day of every month"), " ")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "3",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("On the last weekday of every month"), " ")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "4",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TextField, {
      label: "",
      disabled: every !== "4",
      type: "number",
      InputLabelProps: {
        shrink: true
      },
      variant: "standard",
      onChange: onLastDayChange,
      value: value[3].split("-").length && value[3].split("-")[1] ? value[3].split("-")[1] : ""
    }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("day(s) before the end of the month"), " "))
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_FrontHourText.default, null, translate("Start time")), /*#__PURE__*/_react.default.createElement(_hourSelect.default, {
    onChange: onAtHourChange,
    value: value[2]
  }), /*#__PURE__*/_react.default.createElement(_minutesSelect.default, {
    onChange: onAtMinuteChange,
    value: value[1]
  })));
};
var _default = MonthlyCron;
exports.default = _default;