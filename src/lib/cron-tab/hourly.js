import React, { useEffect, useState } from "react";
import Minutes from "../minutes-select";
import Hour from "../hour-select";
import FrontHourText from "../components/Text/FrontHourText";
import EveryText from "../components/Text/EveryText";
import {
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const HourlyCron = ({ onChange, translate, value }) => {
  const [every, setEvery] = useState(false);
  const [section, setSection] = useState("noevery");

  useEffect(() => {
    if (value[2].split("/")[1] || value[2] === "*") {
      setEvery(true);
    }
  }, [value]);

  const onHourChange = (e) => {
    if (
      every &&
      ((e.target.value > 0 && e.target.value < 24) || e.target.value === "")
    ) {
      let val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = value[1];
      val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
      val[3] = "1/1";
      onChange(val);
    }
  };

  const onMinuteChange = (e) => {
    if (
      every &&
      ((e.target.value > 0 && e.target.value < 60) || e.target.value === "")
    ) {
      let val = ["0", "0", "*", "*", "*", "?", "*"];
      val[1] = e.target.value;
      val[2] = value[2];
      val[3] = "1/1";
      onChange(val);
    }
  };

  const onAtHourChange = (e) => {
    let val = ["0", value[1], "*", "1/1", "*", "?", "*"];
    val[2] = `${e.target.value}`;
    onChange(val);
  };

  const onAtMinuteChange = (e) => {
    let val = ["0", "*", value[2], "1/1", "*", "?", "*"];
    val[1] = `${e.target.value}`;
    onChange(val);
  };

  const handleChange = (e) => {
    setSection(e.target.value);
    setEvery(e.target.value === "every");
    onChange(
      e.target.value === "every"
        ? ["0", "0", "0/1", "1/1", "*", "?", "*"]
        : null
    );
  };

  return (
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
                onChange={onHourChange}
                value={value[2].split("/")[1] ? value[2].split("/")[1] : ""}
              />
              <EveryText>{translate("hour")}</EveryText>
              <TextField
                label=""
                disabled={!every}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={onMinuteChange}
                value={value[1]}
              />
              <EveryText>{translate("minutes(s)")}</EveryText>
            </>
          }
        />
        <FormControlLabel
          value="noevery"
          control={<Radio />}
          label={
            <>
              <FrontHourText>{translate("At")}</FrontHourText>
              <Hour
                disabled={every}
                onChange={onAtHourChange}
                value={value[2]}
              />
              <Minutes
                disabled={every}
                onChange={onAtMinuteChange}
                value={value[1]}
              />
            </>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default HourlyCron;
