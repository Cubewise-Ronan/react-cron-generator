import React from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";

const WeeklyCron = ({ onChange, translate, value }) => {
  const onAtHourChange = (e) => {
    let val = value;
    val[0] = "0";
    val[2] = `${e.target.value}`;
    onChange(val);
  };

  const onAtMinuteChange = (e) => {
    let val = value;
    val[0] = "0";
    val[1] = `${e.target.value}`;
    onChange(val);
  };

  const onCheck = (e) => {
    let val = value;
    val[0] = "0";
    if (e.target.checked) {
      onDayChecked(val, e);
    } else {
      onDayUnChecked(val, e);
    }
    onChange(val);
  };

  const onDayChecked = (val, e) => {
    val[2] = `${val[2]}`.split("/").length > 1 ? "0" : val[2].toString();
    val[3] = "?";
    val[4] = "*";
    if (val[5] === "*" || val[5] === "?" || val[5] === "MON-FRI") {
      val[5] = e.target.value;
    } else {
      val[5] = val[5] + "!" + e.target.value;
    }
    console.log("onDayChecked");
    console.log(val);
  };

  const onDayUnChecked = (val, e) => {
    val[5] = val[5].split("!");
    if (val[5].length > 1) {
      val[5].splice(val[5].indexOf(e.target.value), 1);
      val[5] = val[5].toString().replace(/,/g, "!");
    } else {
      val[5] = "*";
    }
  };

  return (
    <div className="container-fluid">
      <div className="well well-small row">
        <div className="span6 col-sm-6">
          <div className="text_align_left">
            <input
              type="checkbox"
              value="MON"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("MON") !== -1 ? true : false}
            />
            {translate("Monday")}
            <br />
            <input
              type="checkbox"
              value="WED"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("WED") !== -1 ? true : false}
            />
            {translate("Wednesday")}
            <br />
            <input
              type="checkbox"
              value="FRI"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("FRI") !== -1 ? true : false}
            />
            {translate("Friday")}
            <br />
            <input
              type="checkbox"
              value="SUN"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("SUN") !== -1 ? true : false}
            />
            {translate("Sunday")}
          </div>
        </div>
        <div className="span6 col-sm-6">
          <div className="text_align_left">
            <input
              type="checkbox"
              value="TUE"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("TUE") !== -1 ? true : false}
            />
            {translate("Tuesday")}
            <br />
            <input
              type="checkbox"
              value="THU"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("THU") !== -1 ? true : false}
            />
            {translate("Thursday")}
            <br />
            <input
              type="checkbox"
              value="SAT"
              onChange={(e) => onCheck(e)}
              checked={value[5].search("SAT") !== -1 ? true : false}
            />
            {translate("Saturday")}
          </div>
          <br />
          <br />
        </div>
      </div>
      {translate("Start time")}
      <Hour onChange={onAtHourChange} value={value[2]} />
      <Minutes onChange={onAtMinuteChange} value={value[1]} />
    </div>
  );
};

export default WeeklyCron;
