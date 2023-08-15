"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadata = exports.loadHeaders = exports.getTabFromValue = exports.INITIAL_VALUES = exports.HEADER_VALUES = exports.HEADER = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));
var _minutes = _interopRequireDefault(require("../cron-tab/minutes"));
var _daily = _interopRequireDefault(require("../cron-tab/daily"));
var _hourly = _interopRequireDefault(require("../cron-tab/hourly"));
var _weekly = _interopRequireDefault(require("../cron-tab/weekly"));
var _monthly = _interopRequireDefault(require("../cron-tab/monthly"));
var _custom = _interopRequireDefault(require("../cron-tab/custom"));
var _INITIAL_VALUES, _metadata;
var HEADER = {
  MINUTES: "MINUTES",
  HOURLY: "HOURLY",
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  CUSTOM: "CUSTOM"
};
exports.HEADER = HEADER;
var HEADER_VALUES = {
  MINUTES: "Minutes",
  HOURLY: "Hourly",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  CUSTOM: "Custom"
};
exports.HEADER_VALUES = HEADER_VALUES;
var defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY, HEADER_VALUES.CUSTOM];
var INITIAL_VALUES = (_INITIAL_VALUES = {}, (0, _defineProperty2.default)(_INITIAL_VALUES, HEADER_VALUES.MINUTES, ["0", "0/1", "*", "*", "*", "?", "*"]), (0, _defineProperty2.default)(_INITIAL_VALUES, HEADER_VALUES.HOURLY, ["0", "0", "0/1", "1/1", "*", "?", "*"]), (0, _defineProperty2.default)(_INITIAL_VALUES, HEADER_VALUES.DAILY, ["0", "0", "00", "1/1", "*", "?", "*"]), (0, _defineProperty2.default)(_INITIAL_VALUES, HEADER_VALUES.WEEKLY, ["0", "0", "00", "?", "*", "*", "*"]), (0, _defineProperty2.default)(_INITIAL_VALUES, HEADER_VALUES.MONTHLY, ["0", "0", "00", "1", "1/1", "?", "*"]), (0, _defineProperty2.default)(_INITIAL_VALUES, HEADER_VALUES.CUSTOM, ["*", "*", "*", "*", "*", "*", "*"]), _INITIAL_VALUES);
exports.INITIAL_VALUES = INITIAL_VALUES;
var metadata = (_metadata = {}, (0, _defineProperty2.default)(_metadata, HEADER_VALUES.MINUTES, {
  component: _minutes.default,
  initialCron: INITIAL_VALUES[HEADER_VALUES.MINUTES].join(" ")
}), (0, _defineProperty2.default)(_metadata, HEADER_VALUES.HOURLY, {
  component: _hourly.default,
  initialCron: INITIAL_VALUES[HEADER_VALUES.HOURLY].join(" ")
}), (0, _defineProperty2.default)(_metadata, HEADER_VALUES.DAILY, {
  component: _daily.default,
  initialCron: INITIAL_VALUES[HEADER_VALUES.DAILY].join(" ")
}), (0, _defineProperty2.default)(_metadata, HEADER_VALUES.WEEKLY, {
  component: _weekly.default,
  initialCron: INITIAL_VALUES[HEADER_VALUES.WEEKLY].join(" ")
}), (0, _defineProperty2.default)(_metadata, HEADER_VALUES.MONTHLY, {
  component: _monthly.default,
  initialCron: INITIAL_VALUES[HEADER_VALUES.MONTHLY].join(" ")
}), (0, _defineProperty2.default)(_metadata, HEADER_VALUES.CUSTOM, {
  component: _custom.default,
  initialCron: INITIAL_VALUES[HEADER_VALUES.CUSTOM].join(" ")
}), _metadata);
exports.metadata = metadata;
var validateHeaders = function validateHeaders(headers) {
  var validatedHeaders = [];
  headers.forEach(function (header) {
    if (!HEADER_VALUES[header]) {
      throw new Error("Invalid header " + header);
      // Avoid duplicates
    } else if (validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
      validatedHeaders.push(HEADER_VALUES[header]);
    }
  });
  return validatedHeaders;
};

/**
 * Validate and load headers
 * @param {*} options
 */
var loadHeaders = function loadHeaders(options) {
  if (options) {
    if (options.headers) {
      if (!options.headers.length) {
        throw new Error("At least one header is required.");
      }
      return validateHeaders(options.headers);
    }
  }
  return defaultTabs;
};
exports.loadHeaders = loadHeaders;
var getTabFromValue = function getTabFromValue(value, headers) {
  var allHeaders = loadHeaders();
  var _values = value;
  var tabName;
  if (_values[1].search("/") !== -1 && _values[2] === "*" && _values[3] === "1/1") {
    tabName = allHeaders[0];
  } else if (_values[2].search("0/") !== -1) {
    tabName = allHeaders[1];
  } else if (_values[3].search("1/") !== -1 || _values[5] === "MON-FRI") {
    tabName = allHeaders[2];
  } else if (_values[3] === "?") {
    tabName = allHeaders[3];
  } else if (_values[3].startsWith("L") || _values[4] === "1/1") {
    tabName = allHeaders[4];
  } else {
    tabName = headers[0];
  }
  return tabName;
};
exports.getTabFromValue = getTabFromValue;