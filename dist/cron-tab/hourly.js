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
var HourlyCron = function HourlyCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    every = _useState2[0],
    setEvery = _useState2[1];
  var _useState3 = (0, _react.useState)("noevery"),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    section = _useState4[0],
    setSection = _useState4[1];
  (0, _react.useEffect)(function () {
    if (value[2].split("/")[1] || value[2] === "*") {
      setEvery(true);
    }
  }, [value]);
  var onHourChange = function onHourChange(e) {
    if (every && (e.target.value > 0 && e.target.value < 24 || e.target.value === "")) {
      var val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = value[1];
      val[2] = e.target.value ? "0/".concat(e.target.value) : e.target.value;
      val[3] = "1/1";
      onChange(val);
    }
  };
  var onMinuteChange = function onMinuteChange(e) {
    if (every && (e.target.value > 0 && e.target.value < 60 || e.target.value === "")) {
      var val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = e.target.value;
      val[2] = value[2];
      val[3] = "1/1";
      onChange(val);
    }
  };
  var onAtHourChange = function onAtHourChange(e) {
    var val = ["0", value[1], "*", "1/1", "*", "?", "*"];
    val[2] = "".concat(e.target.value);
    onChange(val);
  };
  var onAtMinuteChange = function onAtMinuteChange(e) {
    var val = ["0", "*", value[2], "1/1", "*", "?", "*"];
    val[1] = "".concat(e.target.value);
    onChange(val);
  };
  var handleChange = function handleChange(e) {
    setSection(e.target.value);
    setEvery(e.target.value === "every");
    onChange(e.target.value === "every" ? ["0", "0", "0/1", "1/1", "*", "?", "*"] : null);
  };
  return /*#__PURE__*/_react.default.createElement(_material.FormControl, null, /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    value: section,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "every",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("Every"), " "), /*#__PURE__*/_react.default.createElement(_material.TextField, {
      label: "",
      disabled: !every,
      type: "number",
      InputLabelProps: {
        shrink: true
      },
      variant: "standard",
      onChange: onHourChange,
      value: value[2].split("/")[1] ? value[2].split("/")[1] : ""
    }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("hour")), /*#__PURE__*/_react.default.createElement(_material.TextField, {
      label: "",
      disabled: !every,
      type: "number",
      InputLabelProps: {
        shrink: true
      },
      variant: "standard",
      onChange: onMinuteChange,
      value: value[1]
    }), /*#__PURE__*/_react.default.createElement(_EveryText.default, null, translate("minutes(s)")))
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "noevery",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_FrontHourText.default, null, translate("At")), /*#__PURE__*/_react.default.createElement(_hourSelect.default, {
      disabled: every,
      onChange: onAtHourChange,
      value: value[2]
    }), /*#__PURE__*/_react.default.createElement(_minutesSelect.default, {
      disabled: every,
      onChange: onAtMinuteChange,
      value: value[1]
    }))
  })));
};
var _default = HourlyCron;
exports.default = _default;