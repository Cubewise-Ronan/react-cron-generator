"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));
var _styles = require("@mui/material/styles");
var _Typography = _interopRequireWildcard(require("@mui/material/Typography"));
var FrontHourText = (0, _styles.styled)(_Typography.default)(function () {
  return (0, _defineProperty2.default)({}, "&.".concat(_Typography.typographyClasses.root), {
    display: "inline-block",
    paddingTop: "12px"
  });
});
var _default = FrontHourText;
exports.default = _default;