"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));
var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));
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
    showResultCron = _ref.showResultCron,
    className = _ref.className,
    id = _ref.id;
  var headers = (0, _meta.loadHeaders)(options);
  var _useState = (0, _react.useState)(headers[0]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    currentTab = _useState2[0],
    setCurrentTab = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    values = _useState4[0],
    setValues = _useState4[1];
  var currentValue = (0, _react.useMemo)(function () {
    return values ? values[currentTab] : null;
  }, [values, currentTab]);
  var getVal = (0, _react.useCallback)(function () {
    var val = _i18n.default.toString(currentValue === null || currentValue === void 0 ? void 0 : currentValue.toString().replace(/,/g, " ").replace(/!/g, ","), {
      throwExceptionOnParseError: false,
      locale: locale
    });
    if (val.search("undefined") === -1) {
      return val;
    }
    return "-";
  }, [locale, currentValue]);
  var parentChange = (0, _react.useCallback)(function (val) {
    onChange(val === null || val === void 0 ? void 0 : val.toString().replace(/,/g, " ").replace(/!/g, ","), getVal());
  }, [getVal, onChange]);
  var updateValues = function updateValues(tabName, val) {
    setValues(function (prev) {
      return (0, _objectSpread4.default)((0, _objectSpread4.default)({}, prev), {}, (0, _defineProperty2.default)({}, tabName, val));
    });
    parentChange(val);
  };
  var setValue = (0, _react.useCallback)(function (value) {
    var _value = value;
    if (_value && _value.split(" ").length === 6) {
      _value += " *";
    }
    if (!_value || _value.split(" ").length !== 7) {
      _value = _meta.INITIAL_VALUES[_meta.HEADER_VALUES.DAILY];
    } else {
      _value = _value.replace(/,/g, "!").split(" ");
    }
    var tabName = (0, _meta.getTabFromValue)(_value, headers);
    setCurrentTab(tabName);
    setValues((0, _objectSpread4.default)((0, _objectSpread4.default)({}, JSON.parse(JSON.stringify(_meta.INITIAL_VALUES))), {}, (0, _defineProperty2.default)({}, tabName, _value)));
  }, [headers, setCurrentTab, setValues]);
  var tabChanged = function tabChanged(event, tabIndex) {
    var newTabName = headers[tabIndex];
    if (currentTab !== newTabName) {
      setCurrentTab(newTabName);
      updateValues(newTabName, values[newTabName]);
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
      val = _meta.INITIAL_VALUES[_meta.HEADER_VALUES.DAILY];
    }
    updateValues(currentTab, val);
  };
  var defaultValue = function defaultValue(tabName) {
    var defaultValCron = _meta.metadata[tabName];
    if (!defaultValCron || !defaultValCron.initialCron) {
      return;
    }
    return defaultValCron.initialCron;
  };
  var getComponent = function getComponent(tabName) {
    if (!tabName || !values) return;
    var selectedMetaData = _meta.metadata[tabName];
    if (!selectedMetaData) {
      throw new Error("Value does not match any available headers.");
    }
    var CronComponent = selectedMetaData.component;
    return /*#__PURE__*/_react.default.createElement(CronComponent, {
      translate: translate,
      value: values[tabName],
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
    if (!id) return;
    setValues(null);
  }, [id, setValues]);
  (0, _react.useEffect)(function () {
    if (translateFn && !locale) {
      console.warn("Warning !!! locale not set while using translateFn");
    }
  }, [translateFn, locale]);
  (0, _react.useEffect)(function () {
    // dont do setValue again when values is all set
    if (values) return;
    setValue(value ? value : defaultValue(headers[0]));
  }, [value, values, headers, setValue]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "100%",
      typography: "body1"
    },
    className: "cronContainer ".concat(className)
  }, /*#__PURE__*/_react.default.createElement(_material.Tabs, {
    value: headers.indexOf(currentTab),
    onChange: tabChanged,
    "aria-label": "Time Header"
  }, getHeaders()), /*#__PURE__*/_react.default.createElement("div", {
    className: "cron_builder_bordering"
  }, currentTab ? getComponent(currentTab) : "Select a header"), showResultText && /*#__PURE__*/_react.default.createElement("div", {
    className: "cron-builder-bg"
  }, getVal()), showResultCron && /*#__PURE__*/_react.default.createElement("div", {
    className: "cron-builder-bg"
  }, currentValue === null || currentValue === void 0 ? void 0 : currentValue.toString().replace(/,/g, " ").replace(/!/g, ",")));
};
var _default = Cron;
exports.default = _default;