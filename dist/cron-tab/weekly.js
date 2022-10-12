"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _minutesSelect = _interopRequireDefault(require("../minutes-select"));
var _hourSelect = _interopRequireDefault(require("../hour-select"));
var _FrontHourText = _interopRequireDefault(require("../components/Text/FrontHourText"));
var _material = require("@mui/material");
var WeeklyCron = function WeeklyCron(_ref) {
  var onChange = _ref.onChange,
    translate = _ref.translate,
    value = _ref.value;
  var onAtHourChange = function onAtHourChange(e) {
    var val = value;
    val[0] = "0";
    val[2] = "".concat(e.target.value);
    onChange(val);
  };
  var onAtMinuteChange = function onAtMinuteChange(e) {
    var val = value;
    val[0] = "0";
    val[1] = "".concat(e.target.value);
    onChange(val);
  };
  var onCheck = function onCheck(e) {
    var val = value;
    val[0] = "0";
    if (e.target.checked) {
      onDayChecked(val, e);
    } else {
      onDayUnChecked(val, e);
    }
    onChange(val);
  };
  var onDayChecked = function onDayChecked(val, e) {
    val[2] = "".concat(val[2]).split("/").length > 1 ? "0" : val[2].toString();
    val[3] = "?";
    val[4] = "*";
    if (val[5] === "*" || val[5] === "?" || val[5] === "MON-FRI") {
      val[5] = e.target.value;
    } else {
      val[5] = val[5] + "!" + e.target.value;
    }
  };
  var onDayUnChecked = function onDayUnChecked(val, e) {
    val[5] = val[5].split("!");
    if (val[5].length > 1) {
      val[5].splice(val[5].indexOf(e.target.value), 1);
      val[5] = val[5].toString().replace(/,/g, "!");
    } else {
      val[5] = "*";
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    sx: {
      m: 3
    },
    component: "fieldset",
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_material.FormGroup, null, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("MON") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "MON"
    }),
    label: translate("Monday")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("WED") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "WED"
    }),
    label: translate("Wednesday")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("FRI") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "FRI"
    }),
    label: translate("Friday")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("SUN") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "SUN"
    }),
    label: translate("Sunday")
  }))), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    sx: {
      m: 3
    },
    component: "fieldset",
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_material.FormGroup, null, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("TUE") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "TUE"
    }),
    label: translate("Tuesday")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("THU") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "THU"
    }),
    label: translate("Thursday")
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: value[5].search("SAT") !== -1 ? true : false,
      onChange: function onChange(e) {
        return onCheck(e);
      },
      value: "SAT"
    }),
    label: translate("Saturday")
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_FrontHourText.default, null, translate("Start time")), /*#__PURE__*/_react.default.createElement(_hourSelect.default, {
    onChange: onAtHourChange,
    value: value[2]
  }), /*#__PURE__*/_react.default.createElement(_minutesSelect.default, {
    onChange: onAtMinuteChange,
    value: value[1]
  })));
};
var _default = WeeklyCron;
exports.default = _default;