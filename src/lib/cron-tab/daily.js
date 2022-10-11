/* eslint-disable react/no-direct-mutation-state */
import React, { useState } from "react";
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

const DailyCron = ({ onChange, translate, value }) => {
  const [every, setEvery] = useState(value[3] !== "?");
  const [section, setSection] = useState("every");

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

  const handleChange = (e) => {
    setSection(e.target.value);
    setEvery(e.target.value === "every");
    //onChange((e.target.value === 'every')?null:["0", value[1], value[2], "?", "*", "MON-FRI", "*"]);
  };

  return (
    <>
      <FormControl>
        <RadioGroup value={section} onChange={handleChange}>
          <FormControlLabel
            value="every"
            control={<Radio />}
            label={
              <>
                <EveryText>{translate("Every")} </EveryText>
                <TextField
                  label=""
                  disabled={!every}
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
            value="noevery"
            control={<Radio />}
            label={
              <>
                <TextField
                  label=""
                  disabled={every}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={onDayChange}
                  value={value[3].split("/")[1] ? value[3].split("/")[1] : ""}
                />
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
