/* eslint-disable react/no-direct-mutation-state */
import React, { useState } from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";

const DailyCron = ({ onChange, translate, value }) => {
  const [every, setEvery] = useState(value[3] !== "?");

  const onDayChange = (e) => {
    if (!e.target.value || (e.target.value > 0 && e.target.value < 32)) {
      value = ["0", getValueByIndex(1), getValueByIndex(1), "*", "*", "?", "*"];
      onValueChange(3, e.target.value ? `1/${e.target.value}` : e.target.value);
    }
  };

  /**
   * If value is * return 0 else return value
   * @param {position in array} index
   */
  const getValueByIndex = (index) => {
    return value[index] === "*" ? "0" : value[index];
  };

  const onAtHourChange = (e) => {
    onValueChange(2, e.target.value);
  };

  const onAtMinuteChange = (e) => {
    onValueChange(1, e.target.value);
  };

  const onValueChange = (cronPosition, _value) => {
    let val = value;
    val[cronPosition] = _value;
    onChange(val);
  };
  return (
    <div className="tab-pane">
      <div className="well well-small">
        <input
          type="radio"
          onChange={(e) => {
            setEvery(true);
            onChange();
          }}
          value="1"
          name="DailyRadio"
          checked={every}
        />
        <span>{translate("Every")}</span>
        <input
          disabled={!every}
          type="Number"
          maxLength="2"
          onChange={onDayChange}
          value={value[3].split("/")[1] ? value[3].split("/")[1] : ""}
        />
        <span>{translate("day(s)")}</span>
      </div>
      <div className="well well-small">
        <input
          onChange={(e) => {
            setEvery(false);
            onChange(["0", value[1], value[2], "?", "*", "MON-FRI", "*"]);
          }}
          type="radio"
          value="2"
          name="DailyRadio"
          checked={!every}
        />
        <span>{translate("Every week day")}</span>
      </div>
      <span>{translate("Start time")}</span>
      <Hour onChange={onAtHourChange} value={value[2]} />
      <Minutes onChange={onAtMinuteChange} value={value[1]} />
    </div>
  );
};

export default DailyCron;
