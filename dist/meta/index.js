"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadata = exports.loadHeaders = exports.HEADER = void 0;
var _minutes = _interopRequireDefault(require("../cron-tab/minutes"));
var _daily = _interopRequireDefault(require("../cron-tab/daily"));
var _hourly = _interopRequireDefault(require("../cron-tab/hourly"));
var _weekly = _interopRequireDefault(require("../cron-tab/weekly"));
var _monthly = _interopRequireDefault(require("../cron-tab/monthly"));
var _custom = _interopRequireDefault(require("../cron-tab/custom"));
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
var defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY, HEADER_VALUES.CUSTOM];
var metadata = [{
  component: _minutes.default,
  name: HEADER_VALUES.MINUTES,
  initialCron: ["0", "0/1", "*", "*", "*", "?", "*"]
}, {
  component: _hourly.default,
  name: HEADER_VALUES.HOURLY,
  initialCron: ["0", "0", "00", "1/1", "*", "?", "*"]
}, {
  component: _daily.default,
  name: HEADER_VALUES.DAILY,
  initialCron: ["0", "0", "00", "1/1", "*", "?", "*"]
}, {
  component: _weekly.default,
  name: HEADER_VALUES.WEEKLY,
  initialCron: ["0", "0", "00", "?", "*", "*", "*"]
}, {
  component: _monthly.default,
  name: HEADER_VALUES.MONTHLY,
  initialCron: ["0", "0", "00", "1", "1/1", "?", "*"]
}, {
  component: _custom.default,
  name: HEADER_VALUES.CUSTOM,
  initialCron: ["*", "*", "*", "*", "*", "*", "*"]
}];
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
        throw new Error("Atleast one header is required.");
      }
      return validateHeaders(options.headers);
    }
  }
  return defaultTabs;
};
exports.loadHeaders = loadHeaders;