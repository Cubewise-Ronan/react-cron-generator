/* eslint-disable react/no-direct-mutation-state */
import React, { useState } from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";
import FrontHourText from "../components/Text/FrontHourText";
import EveryText from "../components/Text/EveryText";
import { HEADER_VALUES, INITIAL_VALUES } from "../meta";
import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const SECTION = {
  EVERY: "every",
  EVERY_WEEKDAY: "weekday",
};

const DailyCron = ({ onChange, translate, value }) => {
  const [section, setSection] = useState(
    value[3] === "?" ? SECTION.EVERY_WEEKDAY : SECTION.EVERY
  );

  const onDayChange = (e) => {
    if (!e.target.value || (e.target.value > 0 && e.target.value < 32)) {
      value = ["0", getValueByIndex(1), getValueByIndex(2), "*", "*", "?", "*"];
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

  const handleChange = (e) => {
    setSection(e.target.value);
    if (e.target.value === SECTION.EVERY_WEEKDAY) {
      onChange(["0", value[1], value[2], "?", "*", "MON-FRI", "*"]);
    } else {
      onChange(INITIAL_VALUES[HEADER_VALUES.DAILY]);
    }
  };

  return (
    <>
      <FormControl>
        <RadioGroup value={section} onChange={handleChange}>
          <FormControlLabel
            value={SECTION.EVERY}
            control={<Radio />}
            label={
              <>
                <EveryText>{translate("Every")} </EveryText>
                <TextField
                  label=""
                  disabled={section !== SECTION.EVERY}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={onDayChange}
                  value={value[3].split("/")[1] ? value[3].split("/")[1] : ""}
                />
                <EveryText>{translate("day(s)")} </EveryText>
              </>
            }
          />
          <FormControlLabel
            value={SECTION.EVERY_WEEKDAY}
            control={<Radio />}
            label={
              <>
                <EveryText>{translate("Every week day")} </EveryText>
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

export default DailyCron;
