/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect } from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";
import FrontHourText from "../components/Text/FrontHourText";
import EveryText from "../components/Text/EveryText";
import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

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

  const handleChange = (e) => {
    setEvery(e.target.value);
    let input = [
      "0",
      value[1] === "*" ? "0" : value[1],
      value[2] === "*" ? "0" : value[2],
      `L-${1}`,
      "*",
      "?",
      "*",
    ];
    if (e.target.value === "1") {
      input = [
        "0",
        value[1] === "*" ? "0" : value[1],
        value[2] === "*" ? "0" : value[2],
        "1",
        "1/1",
        "?",
        "*",
      ];
    } else if (e.target.value === "2") {
      input = [
        "0",
        value[1] === "*" ? "0" : value[1],
        value[2] === "*" ? "0" : value[2],
        "L",
        "*",
        "?",
        "*",
      ];
    } else if (e.target.value === "3") {
      input = [
        "0",
        value[1] === "*" ? "0" : value[1],
        value[2] === "*" ? "0" : value[2],
        "LW",
        "*",
        "?",
        "*",
      ];
    }

    onChange(input);
  };
  return (
    <>
      <FormControl>
        <RadioGroup value={every} onChange={handleChange}>
          <FormControlLabel
            value="1"
            control={<Radio />}
            label={
              <>
                <EveryText>{translate("Day")} </EveryText>
                <TextField
                  label=""
                  disabled={every !== "1"}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={onDayChange}
                  value={value[3]}
                />
                <EveryText>{translate("of every month(s)")} </EveryText>
              </>
            }
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label={
              <EveryText>{translate("Last day of every month")} </EveryText>
            }
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={
              <EveryText>
                {translate("On the last weekday of every month")}{" "}
              </EveryText>
            }
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label={
              <>
                <TextField
                  label=""
                  disabled={every !== "4"}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={onLastDayChange}
                  value={
                    value[3].split("-").length && value[3].split("-")[1]
                      ? value[3].split("-")[1]
                      : ""
                  }
                />
                <EveryText>
                  {translate("day(s) before the end of the month")}{" "}
                </EveryText>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
      <Box>
        <FrontHourText>{translate("Start time")}</FrontHourText>
        <Hour onChange={onAtHourChange} value={value[2]} />
        <Minutes onChange={onAtMinuteChange} value={value[1]} />
      </Box>
    </>
  );
};

export default MonthlyCron;
