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
var EveryText = (0, _styles.styled)(_Typography.default)(function () {
  return (0, _defineProperty2.default)({}, "&.".concat(_Typography.typographyClasses.root), {
    display: "inline-block",
    padding: "3px 3px 0px 0px"
  });
});
var _default = EveryText;
exports.default = _default;