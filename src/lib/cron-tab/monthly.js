/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect } from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";

const MonthlyCron = ({ onChange, translate, value }) => {
  const [every, setEvery] = useState(null);

  useEffect(() => {
    if (value[3] === "L") {
      setEvery("2");
    } else if (value[3] === "LW") {
      setEvery("3");
    } else if (value[3].startsWith("L")) {
      setEvery("4");
    } else {
      setEvery("1");
    }
  }, [value]);

  const onDayChange = (e) => {
    if (
      (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ||
      e.target.value === ""
    ) {
      let val = [
        "0",
        value[1] === "*" ? "0" : value[1],
        value[2] === "*" ? "0" : value[2],
        value[3],
        "1/1",
        "?",
        "*",
      ];
      val[3] = `${e.target.value}`;
      onChange(val);
    }
  };

  const onLastDayChange = (e) => {
    if (
      (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31) ||
      e.target.value === ""
    ) {
      let val = [
        "0",
        value[1] === "*" ? "0" : value[1],
        value[2] === "*" ? "0" : value[2],
        value[3],
        "1/1",
        "?",
        "*",
      ];
      if (e.target.value === "") {
        val[3] = "";
      } else {
        val[3] = `L-${e.target.value}`;
      }
      onChange(val);
    }
  };
  const onAtHourChange = (e) => {
    let val = value;
    val[2] = `${e.target.value}`;
    onChange(val);
  };
  const onAtMinuteChange = (e) => {
    let val = value;
    val[1] = `${e.target.value}`;
    onChange(val);
  };
  return (
    <div className="tab-pane">
      <div className="well well-small">
        <input
          type="radio"
          onChange={(e) => {
            setEvery(e.target.value);
            onChange([
              "0",
              value[1] === "*" ? "0" : value[1],
              value[2] === "*" ? "0" : value[2],
              "1",
              "1/1",
              "?",
              "*",
            ]);
          }}
          value="1"
          name="MonthlyRadio"
          checked={every === "1" ? true : false}
        />
        {translate("Day")}
        <input
          readOnly={every !== "1"}
          type="number"
          value={value[3]}
          onChange={onDayChange}
        />
        {translate("of every month(s)")}
      </div>

      <div className="well well-small">
        <input
          onChange={(e) => {
            setEvery(e.target.value);
            onChange([
              "0",
              value[1] === "*" ? "0" : value[1],
              value[2] === "*" ? "0" : value[2],
              "L",
              "*",
              "?",
              "*",
            ]);
          }}
          type="radio"
          value="2"
          name="DailyRadio"
          checked={every === "2" ? true : false}
        />
        {translate("Last day of every month")}
      </div>
      <div className="well well-small">
        <input
          onChange={(e) => {
            setEvery(e.target.value);
            onChange([
              "0",
              value[1] === "*" ? "0" : value[1],
              value[2] === "*" ? "0" : value[2],
              "LW",
              "*",
              "?",
              "*",
            ]);
          }}
          type="radio"
          value="3"
          name="DailyRadio"
          checked={every === "3" ? true : false}
        />
        {translate("On the last weekday of every month")}
      </div>
      <div className="well well-small">
        <input
          type="radio"
          onChange={(e) => {
            setEvery(e.target.value);
            onChange([
              "0",
              value[1] === "*" ? "0" : value[1],
              value[2] === "*" ? "0" : value[2],
              `L-${1}`,
              "*",
              "?",
              "*",
            ]);
          }}
          value="4"
          name="MonthlyRadio"
          checked={every === "4" ? true : false}
        />

        <input
          readOnly={every !== "4"}
          type="number"
          value={
            value[3].split("-").length && value[3].split("-")[1]
              ? value[3].split("-")[1]
              : ""
          }
          onChange={onLastDayChange}
        />
        {translate("day(s) before the end of the month")}
      </div>
      {translate("Start time")}
      <Hour onChange={onAtHourChange} value={value[2]} />
      <Minutes onChange={onAtMinuteChange} value={value[1]} />
    </div>
  );
};

export default MonthlyCron;
