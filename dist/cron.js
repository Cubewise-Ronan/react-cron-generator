"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _i18n = _interopRequireDefault(require("cronstrue/i18n"));
var _meta = require("./meta");
require("./cron-builder.css");
/* eslint-disable react/no-direct-mutation-state */

var Cron = function Cron(_ref) {
  var value = _ref.value,
    translateFn = _ref.translateFn,
    locale = _ref.locale,
    onChange = _ref.onChange,
    options = _ref.options,
    showResultText = _ref.showResultText,
    showResultCron = _ref.showResultCron;
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    selectedTab = _useState2[0],
    setSelectedTab = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    tab = _useState4[0],
    setTab = _useState4[1];
  var _useState5 = (0, _react.useState)(value),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    thisValue = _useState6[0],
    setThisValue = _useState6[1];
  var headers = (0, _react.useMemo)(function () {
    return (0, _meta.loadHeaders)(options);
  }, [options]);
  var getVal = (0, _react.useCallback)(function () {
    var val = _i18n.default.toString(thisValue === null || thisValue === void 0 ? void 0 : thisValue.toString().replace(/,/g, " ").replace(/!/g, ","), {
      throwExceptionOnParseError: false,
      locale: locale
    });
    if (val.search("undefined") === -1) {
      return val;
    }
    return "-";
  }, [locale, thisValue]);
  var parentChange = (0, _react.useCallback)(function (val) {
    onChange(val === null || val === void 0 ? void 0 : val.toString().replace(/,/g, " ").replace(/!/g, ","), getVal());
  }, [getVal, onChange]);
  var setValue = (0, _react.useCallback)(function (value) {
    var allHeaders = (0, _meta.loadHeaders)();
    console.log("value");
    console.log(value);
    var _value = value;
    var _selectedTab = selectedTab;
    var _tab = tab;
    if (_value && _value.split(" ").length === 6) {
      _value += " *";
    }
    if (!_value || _value.split(" ").length !== 7) {
      _value = ["0", "0", "00", "1/1", "*", "?", "*"];
      _selectedTab = allHeaders[0];
      parentChange(_value);
    } else {
      _value = _value.replace(/,/g, "!").split(" ");
    }
    var _values = _value;
    if (_values[1].search("/") !== -1 && _values[2] === "*" && _values[3] === "1/1") {
      _selectedTab = allHeaders[0];
      _tab = 0;
    } else if (_values[3] === "1/1") {
      _selectedTab = allHeaders[1];
      _tab = 1;
    } else if (_values[3].search("/") !== -1 || _values[5] === "MON-FRI") {
      _selectedTab = allHeaders[2];
      _tab = 2;
    } else if (_values[3] === "?") {
      _selectedTab = allHeaders[3];
      _tab = 3;
    } else if (_values[3].startsWith("L") || _values[4] === "1/1") {
      _selectedTab = allHeaders[4];
      _tab = 4;
    } else {
      _selectedTab = allHeaders[0];
      _tab = 0;
    }
    if (!headers.includes(_selectedTab)) {
      _selectedTab = headers[0];
      _tab = 0;
    }
    setSelectedTab(_selectedTab);
    setTab(_tab);
    setThisValue(_value);
  }, [headers, parentChange, selectedTab, tab]);
  var tabChanged = function tabChanged(event, tab) {
    if (selectedTab !== headers[tab]) {
      setTab(tab);
      setSelectedTab(headers[tab]);
      setThisValue(defaultValue(headers[tab]));
    }
  };
  var getHeaders = function getHeaders() {
    return headers.map(function (d) {
      return /*#__PURE__*/_react.default.createElement(_material.Tab, {
        key: d,
        label: translate(d)
      });
    });
  };
  var onValueChange = function onValueChange(val) {
    if (!(val && val.length)) {
      val = ["0", "0", "00", "1/1", "*", "?", "*"];
    }
    setThisValue(val);
    parentChange(val);
  };
  var defaultValue = function defaultValue(tab) {
    var defaultValCron = _meta.metadata.find(function (m) {
      return m.name === tab;
    });
    if (!defaultValCron || !defaultValCron.initialCron) {
      return;
    }
    return defaultValCron.initialCron;
  };
  var getComponent = function getComponent(tab) {
    var index = headers.indexOf(tab);
    if (_meta.metadata[index] === -1) {
      return;
    }
    var selectedMetaData = _meta.metadata.find(function (data) {
      return data.name === tab;
    });
    if (!selectedMetaData) {
      selectedMetaData = _meta.metadata[index];
    }
    if (!selectedMetaData) {
      throw new Error("Value does not match any available headers.");
    }
    var CronComponent = selectedMetaData.component;
    return /*#__PURE__*/_react.default.createElement(CronComponent, {
      translate: translate,
      value: thisValue,
      onChange: onValueChange
    });
  };
  var translate = function translate(key) {
    var translatedText = key;
    if (translateFn) {
      translatedText = translateFn(key);
      if (typeof translatedText !== "string") {
        throw new Error("translateFn expects a string translation");
      }
    }
    return translatedText;
  };
  (0, _react.useEffect)(function () {
    if (translateFn && !locale) {
      console.log("Warning !!! locale not set while using translateFn");
    }
  }, [translateFn, locale]);
  (0, _react.useEffect)(function () {
    parentChange(thisValue);
  }, [thisValue, parentChange]);
  (0, _react.useEffect)(function () {
    if (value) {
      var newVal = value.toString().replace(/,/g, " ").replace(/!/g, ",");
      if (value !== newVal) {
        setValue(value);
      }
    } else {
      setValue(defaultValue(null));
    }
    // dependency setValue will cause infinite render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "100%",
      typography: "body1"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Tabs, {
    value: tab,
    onChange: tabChanged,
    "aria-label": "Time Header"
  }, getHeaders()), /*#__PURE__*/_react.default.createElement("div", {
    className: "cron_builder_bordering"
  }, selectedTab ? getComponent(selectedTab) : "Select a header"), showResultText && /*#__PURE__*/_react.default.createElement("div", {
    className: "cron-builder-bg"
  }, getVal()), showResultCron && /*#__PURE__*/_react.default.createElement("div", {
    className: "cron-builder-bg"
  }, thisValue === null || thisValue === void 0 ? void 0 : thisValue.toString().replace(/,/g, " ").replace(/!/g, ",")));
};
var _default = Cron;
exports.default = _default;